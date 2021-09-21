const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const mailService = require('../services/mailService');
const jwt = require('jsonwebtoken');

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
          expiresIn: '1h',
        }
      );

      const msg = mailService.createMailMessage({
        to: email,
        subject: `HR Manager - przywrócenie hasła`,
        text: '',
        html: `<h3>Witaj ${emp[0].employeePerson.FirstName},</h3><br/><br/><br/><p>Zmiana hasła będzie możliwa przez najbliższą godzinę, następnie link wygaśnie.</p><br/><a href="${process.env.CLIENT_BASE_URL}/zmiana-hasla/${restoreToken}"><button>Zmień hasło</button></a>`,
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
