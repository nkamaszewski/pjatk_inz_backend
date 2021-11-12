const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  EmployeeRepository.getEmployeesByEmail(email).then((emp) => {
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

        const token = jwt.sign(
          { id: emp[0].IdPerson, idRole: emp[0].IdRole },
          process.env.JWT_AUTH_TOKEN_SECRET,
          {
            expiresIn: '1d',
          }
        );

        res.status(200).json({
          user: { ...emp[0].employeePerson.dataValues, IdRole: emp[0].IdRole },
          token,
        });
      });
    }
  });
};
