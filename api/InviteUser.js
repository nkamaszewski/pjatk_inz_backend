const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const mailService = require('../services/mailService');
const jwt = require('jsonwebtoken');
const { activateEmailTemplate } = require('../templates/activate_email');

exports.invite = (req, res, next) => {
  const email = req.body.email;
  EmployeeRepository.getEmployeesByEmail(email).then((emp) => {
    if (!emp) {
      res.status(403).json({
        message: 'Użytkownik nie istnieje.',
      });
    } else {
      const restoreToken = jwt.sign(
        { id: emp[0].IdPerson, email: emp[0].employeePerson.Email },
        process.env.JWT_AUTH_RESTORE_PASSWORD_TOKEN,
        {
          expiresIn: '1d',
        }
      );

      const msg = mailService.createMailMessage({
        to: email,
        subject: `HR Manager - link aktywacyjny`,
        text: '',
        html: activateEmailTemplate(
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
