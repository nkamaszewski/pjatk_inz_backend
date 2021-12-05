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
    } else if (emp.IsActive) {
      res.status(403).json({
        message: 'Użytkownik jest już aktywny',
      });
    } else {
      const restoreToken = jwt.sign(
        { id: emp.IdPerson, email: emp.Email },
        process.env.JWT_AUTH_RESTORE_PASSWORD_TOKEN,
        {
          expiresIn: '1d',
        }
      );

      const msg = mailService.createMailMessage({
        to: email,
        subject: `HR Manager - link aktywacyjny`,
        text: '',
        html: activateEmailTemplate(emp.FirstName, restoreToken),
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
