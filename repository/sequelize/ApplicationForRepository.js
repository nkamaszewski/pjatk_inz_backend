const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const Education = require('../../model/sequelize/Education');
const Status = require('../../model/sequelize/Status');
const Employee = require('../../model/sequelize/Employee');

exports.getApplicationFor = () => {
  return ApplicationFor.findAll({
    attributes: [
      'IdApplicationFor',
      'DateOfSubmission',
      'IdEducation',
      'IdStatus',
      'Compatibility'
    ],
    include: [
      {
        model: Education,
        as: 'applicationForEducation'
      },
      {
        model: Status,
        as: 'applicationForStatus'
      },
      {
        model: Employee,
        as: 'applicationForEmployee'
      },
    ],
  });
};

exports.createApplicationFor = (newApplicationForData) => {
  const { IdPerson, DateOfSubmission, IdEducation, IdStatus, Compatibility } =
    newApplicationForData;
  return ApplicationFor.create({
    IdPerson,
    DateOfSubmission,
    IdEducation,
    IdStatus,
    Compatibility,
  });
};

exports.deleteApplicationFor = (applicationForId) => {
  return ApplicationFor.destroy({
    where: { IdApplicationFor: applicationForId },
  });
};

exports.updateApplicationFor = (applicationForId, data) => {
  const IdApplicationFor = data.IdApplicationFor;
  const DateOfSubmission = data.DateOfSubmission;
  const IdEducation = data.IdEducation;
  const IdStatus = data.IdStatus;
  const Compatibility = data.Compatibility;

  return ApplicationFor.update(data, {
    where: { IdApplicationFor: applicationForId },
  });
};

exports.getApplicationForById = (appForId) => {
  return ApplicationFor.findByPk(appForId);
};