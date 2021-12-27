const Participation = require('../../model/sequelize/Participation');
const Questionnaire = require('../../model/sequelize/Questionnaire');

exports.getQuestionnaires = () => {
    return Questionnaire.findAll({
        attributes: ['IdQuestionnaire', 'IdParticipation', 'Date'],
        include: [{
            model: Participation,
            as: 'participationsQuestionnaire'
        }]
    });
};

exports.createQuestionnaire = (newQuestionnaireData) => {
    return Questionnaire.create({
        Date: newQuestionnaireData.Date,
        IdParticipation: newQuestionnaireData.IdParticipation
    });
};

exports.deleteQuestionnaire = (questionnaireId) => {
    return Questionnaire.destroy({
        where: { IdQuestionnaire: questionnaireId }
    });
};

exports.updateQuestionnaire = (questionnaireId, data) => {
    const date = data.Date;
    const idParticipation = data.IdParticipation;
    return Questionnaire.update(data, { where: { IdQuestionnaire: questionnaireId } });
}

exports.getQuestionnaireById = (questId) => {
    return Questionnaire.findByPk(questId);
};
