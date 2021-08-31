const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const bcrypt = require('bcrypt');
const salt = require('../helpers/saltRound');

exports.register = (req, res, next) => {
  const { Password } = req.body;
  bcrypt.hash(Password, salt.saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
    }
    console.log('hash', hash);
    console.log(req.body);
    EmployeeRepository.createEmployee({ ...req.body, Password: hash })
      .then((newObj) => {
        res.status(201).json(newObj);
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};
