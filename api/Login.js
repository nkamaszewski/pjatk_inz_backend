const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const bcrypt = require('bcrypt');
const salt = require('../helpers/saltRound');

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('email', email);
  EmployeeRepository.getEmployeesByLoginAndPassword(email).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'Użytkownik nie istnieje.',
      });
    } else {
      const empHashPassword = emp[0].Password;

      bcrypt.compare(password, empHashPassword).then((isCorrect) => {
        if (!isCorrect) {
          res.status(404).json({
            message: 'Login lub hasło niepoprawne',
          });
        }

        res.status(200).json('autentykacja poprawna');
      });
    }
  });
};