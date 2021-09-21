const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

exports.restore = (req, res, next) => {
  const email = req.body.email;

  EmployeeRepository.getEmployeesByEmail(email).then((emp) => {
    if (!emp.length) {
      res.status(403).json({
        message: 'Użytkownik nie istnieje.',
      });
    } else {
      // TODO: mail do usera
    }
  });
};
