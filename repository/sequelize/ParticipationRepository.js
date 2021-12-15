const Participation = require('../../model/sequelize/Participation');
const Employee = require('../../model/sequelize/Employee');
const Person = require('../../model/sequelize/Person');

exports.getParticipations = () => {
  return Participation.findAll({
    attributes: [
      'IdParticipation',
      'IdPerson',
      'IdEducation',
      'DateOfRegistration',
      'EndDate',
      'CertificateOfCompletion',
    ],
    include: [
      {
        model: Employee,
        as: 'participationEmployee',
      },
    ],
  });
};

exports.getParticipationsByIdEducation = (IdEducation) => {
  return Participation.findAll({
    attributes: [
      'IdParticipation',
      'IdPerson',
      'IdEducation',
      'DateOfRegistration',
      'EndDate',
      'CertificateOfCompletion',
    ],
    where: { IdEducation },
    include: [
      {
        model: Employee,
        as: 'participationEmployee',
        include: [
          {
            model: Person,
            as: 'employeePerson',
          },
        ],
      },
    ],
  });
};

exports.createParticipation = (newParticipationData) => {
  return Participation.create({
    DateOfRegistration: newParticipationData.DateOfRegistration,
    EndDate: newParticipationData.EndDate,
    CertificateOfCompletion: newParticipationData.CertificateOfCompletion,
    IdPerson: newParticipationData.IdPerson,
    IdEducation: newParticipationData.IdEducation,
  });
};

exports.deleteParticipation = (participationId) => {
  return Participation.destroy({
    where: { IdParticipation: participationId },
  });
};

exports.updateParticipation = (participationId, data) => {
  const dateOfRegistration = data.DateOfRegistration;
  const endDate = data.EndDate;
  const certificateOfCompletion = data.CertificateOfCompletion;
  const idPerson = data.IdPerson;
  const idEducation = data.IdEducation;
  return Participation.update(data, {
    where: { IdParticipation: participationId },
  });
};

exports.getParticipationById = (participId) => {
  return Participation.findByPk(participId);
};
