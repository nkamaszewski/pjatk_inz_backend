const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const PersonRepository = require('../repository/sequelize/PersonRepository');
const bcrypt = require('bcrypt');
const salt = require('../helpers/saltRound');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
  const { firstName, lastName, phone, email, pesel, password } = req.body;

  PersonRepository.createPerson({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Phone: phone,
  })
    .then((newPerson) => {
      const { IdPerson } = newPerson;
      bcrypt.hash(password, salt.saltRounds, (err, hash) => {
        if (err) {
          console.error(err);
        }
        EmployeeRepository.createEmployee({
          IdPerson,
          Pesel: pesel,
          Password: hash,
          IdRole: 4,
          IsActive: true,
        })
          .then((newObj) => {
            // sukces
            const token = jwt.sign(
              { id: newObj.IdPerson, idRole: newObj.IdRole },
              process.env.JWT_AUTH_TOKEN_SECRET,
              {
                expiresIn: '1d',
              }
            );

            res.status(200).json({
              user: { ...newPerson.dataValues, IdRole: newObj.IdRole },
              token,
            });
          })
          .catch((err) => {
            console.log(err);
            if (!err.statusCode) {
              err.statusCode = 500;
              res.status(403).json({
                message: 'Rejestracja Employee nie powiodła się!',
              });
            }
            next(err);
          });
      });
    })
    .catch((err) => {
      err.statusCode = 500;
      res.status(403).json({
        message: 'Rejestracja Person nie powiodła się!',
      });
    });
};
