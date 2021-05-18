const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const QuestionnaireOffer = sequelize.define('QuestionnaireOffer', {
    idQuestionnaireOffer: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Year: { type: Sequelize.INTEGER, allowNull: false},
	idPerson: { type: Sequelize.INTEGER, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'QuestionnaireOffer'
});
module.exports = QuestionnaireOffer;