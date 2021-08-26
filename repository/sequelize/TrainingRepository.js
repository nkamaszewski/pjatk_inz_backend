const Education = require('../../model/sequelize/Education');
const Coach = require('../../model/sequelize/Coach');
const Person = require('../../model/sequelize/Person');

const Topic = require('../../model/sequelize/Topic');
const Company = require('../../model/sequelize/Company');

const Training = require('../../model/sequelize/Training');

exports.getTrainings = () => {
  return Training.findAll({
    attributes: ['Internal', 'DateFrom', 'DateTo'],
    include: [
      {
        model: Education,
        as: 'trainingEducation',
      },
      {
        model: Company,
        as: 'trainingCompany',
      },
      {
        model: Topic,
        as: 'trainingTopic',
      },
      {
        model: Coach,
        as: 'trainingCoach',
        include: [
          {
            model: Person,
            as: 'CoachPerson',
          },
        ],
      },
    ],
  });
};

exports.createTraining = (newTrainingData) => {
  return Training.create({
    IdEducation: newTrainingData.IdEducation,
    IdTopic: newTrainingData.IdTopic,
    IdCompany: newTrainingData.IdCompany,
    IdPerson: newTrainingData.IdPerson,
    Internal: newTrainingData.Internal,
    DateFrom: newTrainingData.DateFrom,
    DateTo: newTrainingData.DateTo,
  });
};

exports.deleteTraining = (eduId) => {
  return Training.destroy({
    where: { IdEducation: eduId },
  });
};

exports.updateTraining = (eduId, data) => {
  const name = data.Name;
  const idDivision = data.IdDivision;

  const IdEducation = data.IdEducation;
  const IdTopic = data.IdTopic;
  const IdCompany = data.IdCompany;
  const IdPerson = data.IdPerson;
  const Internal = data.Internat;
  const DateFrom = data.DateFrom;
  const DateTo = data.DateTo;

  return Training.update(data, { where: { IdEducation: eduId } });
};

exports.getTrainingById = (eduId) => {
  return Training.findByPk(eduId);
};
