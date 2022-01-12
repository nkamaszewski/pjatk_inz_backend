const Participation = require('../../model/sequelize/Participation');
const Questionnaire = require('../../model/sequelize/Questionnaire');

exports.getQuestionnaires = () => {
	return Questionnaire.findAll({
		include: [
			{
				model: Participation,
				as: 'questionnairesParticipation',
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
