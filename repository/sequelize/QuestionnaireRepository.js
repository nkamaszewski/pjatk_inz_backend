const Participation = require('../../model/sequelize/Participation');
const Questionnaire = require('../../model/sequelize/Questionnaire');
const Employee = require('../../model/sequelize/Employee');
const Person = require('../../model/sequelize/Person');
const Education = require('../../model/sequelize/Education');
const Study = require('../../model/sequelize/Study');
const OtherEducation = require('../../model/sequelize/OtherEducation');
const Training = require('../../model/sequelize/Training');
const Topic = require('../../model/sequelize/Topic');

exports.getQuestionnaires = () => {
  return Questionnaire.findAll({
    include: [
      {
        model: Participation,
        as: 'questionnairesParticipation',
        include: [
          {
            model: Employee,
            as: 'participationEmployee',
            include: {
              model: Person,
              as: 'employeePerson',
            },
          },
          {
            model: Education,
            as: 'participationEducation',
            include: [
              {
                model: Study,
                as: 'educationStudy',
              },
              {
                model: OtherEducation,
                as: 'educationOtherEducation',
              },
              {
                model: Training,
                as: 'educationTraining',
                include: {
                  model: Topic,
                  as: 'trainingTopic',
                },
              },
            ],
          },
        ],
      },
    ],
  });
};

exports.createQuestionnaire = (newQuestionnaireData) => {
  return Questionnaire.create({
    Date: newQuestionnaireData.Date,
    IdParticipation: newQuestionnaireData.IdParticipation,
    Issue1: newQuestionnaireData.Issue1,
    Issue2: newQuestionnaireData.Issue2,
    Issue3: newQuestionnaireData.Issue3,
    Issue4: newQuestionnaireData.Issue4,
    Issue5: newQuestionnaireData.Issue5,
  });
};

exports.deleteQuestionnaire = (questionnaireId) => {
  return Questionnaire.destroy({
    where: { IdQuestionnaire: questionnaireId },
  });
};

exports.updateQuestionnaire = (questionnaireId, data) => {
  const date = data.Date;
  const idParticipation = data.IdParticipation;
  return Questionnaire.update(data, {
    where: { IdQuestionnaire: questionnaireId },
  });
};

exports.getQuestionnaireById = (questId) => {
  return Questionnaire.findByPk(questId);
};
