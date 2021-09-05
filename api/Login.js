const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('email', email);
  EmployeeRepository.getEmployeesByLoginAndPassword(email).then((emp) => {
    if (!emp.length) {
      res.status(403).json({
        message: 'Użytkownik nie istnieje.',
      });
    } else {
      const empHashPassword = emp[0].Password;

      bcrypt.compare(password, empHashPassword).then((isCorrect) => {
        if (!isCorrect) {
          res.status(403).json({
            message: 'Login lub hasło niepoprawne',
          });
        }

        const token = jwt.sign({ id: emp.IdPerson }, 'jwtSecret', {
          expiresIn: 500,
        });

        res.status(200).json({ auth: true, user: { id: emp.IdPerson, token } });
      });
    }
  });
};
