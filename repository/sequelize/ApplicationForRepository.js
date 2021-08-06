const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const Education = require('../../model/sequelize/Education');
const Status = require('../../model/sequelize/Status');
const Person = require('../../model/sequelize/Person');

exports.getApplicationFor = () => {
  return ApplicationFor.findAll({
    attributes: [
      'IdAplicationFor',
      'DateOfSubmission',
      'IdEducation',
      'IdStatus',
      'Compatibility',
    ],
    include: [
      {
        model: Education,
        as: 'applicationForEducation',
      },
      {
        model: Status,
        as: 'applicationForStatus',
      },
      {
        model: Person,
        as: 'applicationForPerson',
      },
    ],
  });
};

exports.createApplicationFor = (newApplicationForData) => {
    const {IdAplicationFor,
    DateOfSubmission,
    IdEducation,
    IdStatus,
    Compatibility} = newApplicationForData
  return ApplicationFor.create({
    IdAplicationFor,
    DateOfSubmission,
    IdEducation,
    IdStatus,
    Compatibility 
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

  
  return ApplicationFor.update(data, { where: { IdApplicationFor: applicationForId } });
};

exports.getApplicationForById = (appForId) => {
  return ApplicationFor.findByPk(appForId);
};