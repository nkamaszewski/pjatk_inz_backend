const Issue = require('../../model/sequelize/Issue');
const QuestionnaireIssue = require('../../model/sequelize/QuestionnaireIssue');

exports.getQuestionnaireIssues = () => {
    return QuestionnaireIssue.findAll({
        attributes: ['IdQuestionnaireIssue', 'IdQuestionnaire', 'IdIssue', 'Rating'],
        include: [{
            model: Issue,
            as: 'questionnaireissuesIssue'
        }]
    });
};

exports.createQuestionnaireIssue = (newQuestionnaireIssueData) => {
    return QuestionnaireIssue.create({
        Rating: newQuestionnaireIssueData.Rating,
        IdIssue: newQuestionnaireIssueData.IdIssue
    });
};

exports.deleteQuestionnaireIssue = (QuestionnaireIssueId) => {
    return QuestionnaireIssue.destroy({
        where: { IdQuestionnaireIssue: QuestionnaireIssueId }
    });
};

exports.updateQuestionnaireIssue = (QuestionnaireIssueId, data) => {
    const rating = data.Rating;
    const idIssue = data.IdIssue;
    return QuestionnaireIssue.update(data, { where: { IdQuestionnaireIssue: QuestionnaireIssueId } });
}

exports.getQuestionnaireIssueById = (questisId) => {
    return QuestionnaireIssue.findByPk(questisId);
};