const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const emp = await EmployeeRepository.getEmployeesByEmail(email)
  console.log(emp);
  if (!emp) {
    res.status(403).json({
      message: 'Użytkownik nie istnieje.',
    });
  } else {
    const empHashPassword = emp.Password;

    bcrypt.compare(password, empHashPassword).then((isCorrect) => {
      if (!isCorrect) {
        res.status(403).json({
          message: 'Login lub hasło niepoprawne lub pracownik niezatrudniony',
        });
      }

      const token = jwt.sign({
          id: emp.IdPerson,
          idRole: emp.IdRole,
          idDepartment: emp.IdDepartment,
          idDivision: emp.IdDivision
        },
        process.env.JWT_AUTH_TOKEN_SECRET, {
          expiresIn: '1d',
        }
      );

      delete emp.Password;
      res.status(200).json({
        user: emp,
        token,
      });
    });
  }

};