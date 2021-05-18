const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const QuestionnaireIssue = sequelize.define('QuestionnaireIssue', {
    idQuestionnaireIssue: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	idQuestionnaire: { type: Sequelize.INTEGER, allowNull: false },
	idIssue: { type: Sequelize.INTEGER, allowNull: false },
	Rating: { type: Sequelize.INTEGER, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'QuestionnaireIssue'
});
module.exports = QuestionnaireIssue;