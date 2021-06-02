const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const QuestionnaireIssue = sequelize.define('QuestionnaireIssue', {
    IdQuestionnaireIssue: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	IdQuestionnaire: { type: Sequelize.INTEGER, allowNull: false },
	IdIssue: { type: Sequelize.INTEGER, allowNull: false },
	Rating: { type: Sequelize.INTEGER, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'QuestionnaireIssue'
});
module.exports = QuestionnaireIssue;