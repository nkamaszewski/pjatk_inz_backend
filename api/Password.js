const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const mailService = require('../services/mailService');
const jwt = require('jsonwebtoken');
const { restoreEmailTemplate } = require('../templates/restore_email');
const bcrypt = require('bcrypt');
const salt = require('../helpers/saltRound');

exports.restore = (req, res, next) => {
  const email = req.body.email;
  EmployeeRepository.getEmployeesByEmail(email).then((emp) => {
    console.log('email + emp', email, emp);
    if (!emp) {
      res.status(403).json({
        message: 'Użytkownik nie istnieje.',
      });
    } else {
      const restoreToken = jwt.sign(
        { id: emp[0].IdPerson },
        process.env.JWT_AUTH_RESTORE_PASSWORD_TOKEN,
        {
          expiresIn: '1d',
        }
      );

      const msg = mailService.createMailMessage({
        to: email,
        subject: `HR Manager - przywrócenie hasła`,
        text: '',
        html: restoreEmailTemplate(
          emp[0].employeePerson.FirstName,
          restoreToken
        ),
      });

      mailService.sendMail(msg, (err, info) => {
        if (err) {
          console.error('error: ', err);
          res.send('mail was not sent');
        } else {
          console.log(info);
          res.send('wyslano mail');
        }
      });
    }
  });
};

exports.change = (req, res, next) => {
  const token = req.headers['x-access-token'];
  const { email, password } = req.body;
  jwt.verify(
    token,
    process.env.JWT_AUTH_RESTORE_PASSWORD_TOKEN,
    (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'Token is incorrect' });
      }

      const id = decoded.id;

      EmployeeRepository.getEmployeesByEmail(email).then((emp) => {
        if (!emp.length || emp[0].IdPerson !== id) {
          res.status(403).json({
            message: 'User does not exist!',
          });
        } else {
          bcrypt.hash(password, salt.saltRounds, (err, hash) => {
            EmployeeRepository.updateEmployee(id, {
              Password: hash,
              IsActive: true,
            }).then((emp) => {
              if (emp) {
                res.send('password was changed.');
              } else {
                res.status(500).send('password was not changed in database');
              }
            });
          });
        }
      });
    }
  );
};
