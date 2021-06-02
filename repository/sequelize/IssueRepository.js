const Issue = require('../../model/sequelize/Issue');
const QuestionnaireIssue = require('../../model/sequelize/QuestionnaireIssue');

exports.getIssues = () => {
    return Issue.findAll();
};

exports.createIssue = (newIssueData) => {
    return Issue.create({
        Description: newIssueData.Description
    });
};

exports.deleteIssue = (IssueId) => {
    return Issue.destroy({
        where: { IdIssue: IssueId }
    });
};

exports.updateIssue = (IssueId, data) => {
    const description = data.Description;
    return Issue.update(data, { where: { IdIssue: IssueId } });
}

exports.getIssueById = (issId) => {
    return Issue.findByPk(issId,
        {
            include: [{
                model: QuestionnaireIssue,
                as: 'questionnaireissueIssues'
            }]
        });
};