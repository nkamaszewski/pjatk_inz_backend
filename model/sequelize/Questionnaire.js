const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Questionnaire = sequelize.define('Questionnaire', {
    idQuestionnaire: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	idParticipation: { type: Sequelize.INTEGER, allowNull: false},
	Date: { type: Sequelize.DATE, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'Questionnaire'
});
module.exports = Questionnaire;