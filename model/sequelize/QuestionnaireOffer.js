const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const QuestionnaireOffer = sequelize.define(
	"QuestionnaireOffer",
	{
		IdQuestionnaireOffer: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Year: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać rok",
				},
				notEmpty: {
					msg: "Należy podać rok",
				},
				isNumeric: {
					msg: "Rok powinien być liczbą",
				},
			},
		},
		IdPerson: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy wybrać pracownika",
				},
				notEmpty: {
					msg: "Należy wybrać pracownika",
				},
				isNumeric: {
					msg: "Należy wybrać pracownika",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "QuestionnaireOffer",
		indexes: [
			{
				name: "idx_QuestionnaireOffer",
				unique: true,
				fields: ["IdPerson", "Year"],
			},
		],
	}
);
module.exports = QuestionnaireOffer;
