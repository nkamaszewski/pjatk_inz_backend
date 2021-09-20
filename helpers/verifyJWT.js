const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.send('You need a token, you are not authenticated');
  }
  jwt.verify(token, 'jwtSecret', (err, decoded) => {
    if (err) {
      res.json({ auth: false, message: 'Token is incorrect' });
    }

    req.userId = decoded.id;
    next();
  });
};
