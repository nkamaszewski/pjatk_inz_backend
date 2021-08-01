const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const QuestionnaireOffer = sequelize.define('QuestionnaireOffer', {
    IdQuestionnaireOffer: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Year: { type: Sequelize.INTEGER, allowNull: false },
    IdPerson: { type: Sequelize.INTEGER, allowNull: false }
}, {
    timestamps: false,
    tableName: 'QuestionnaireOffer'
});
module.exports = QuestionnaireOffer;