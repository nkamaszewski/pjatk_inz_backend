const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const mailService = require('../services/mailService');
const jwt = require('jsonwebtoken');
const { restoreEmailTemplate } = require('../templates/restore_email');

exports.restore = (req, res, next) => {
  const email = req.body.email;
  EmployeeRepository.getEmployeesByEmail(email).then((emp) => {
    if (!emp.length) {
      res.status(403).json({
        message: 'Użytkownik nie istnieje.',
      });
    } else {
      const restoreToken = jwt.sign(
        { id: emp.IdPerson },
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
