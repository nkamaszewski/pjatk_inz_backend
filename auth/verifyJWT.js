const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res
      .status(401)
      .json({ message: 'You need a token, you are not authenticated' });
  }
  jwt.verify(token, process.env.JWT_AUTH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ auth: false, message: 'Token is incorrect' });
    }

    req.userId = decoded.id;
    req.userIdRole = decoded.idRole;
    req.userIdDepartment = decoded.idDepartment;
    req.userIdDivision = decoded.idDivision;
    next();
  });
};
