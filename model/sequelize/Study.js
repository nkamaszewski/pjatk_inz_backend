const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Study = sequelize.define(
	"Study",
	{
		IdEducation: {
			type: Sequelize.INTEGER,
			autoIncrement: false,
			allowNull: false,
			primaryKey: true,
		},
		FieldOfStudy: {
			type: Sequelize.STRING,
			allowNull: false,
			notNull: {
				msg: "Należy podać kierunek studiów",
			},
			notEmpty: {
				msg: "Należy podać kierunek studiów",
			},
		},
		IdUniversity: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Wymagany jest wybór uczelni",
				},
				isInt: {
					msg: "Wymagany jest wybór uczelni",
				},
			},
		},
		IdStudyMode: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Wymagany jest wybór trybu studiów",
				},
				isInt: {
					msg: "Wymagany jest wybór trybu studiów",
				},
			},
		},
		IdGraduateDegree: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Wymagany jest stopnia studiów",
				},
				isInt: {
					msg: "Wymagany jest stopnia studiów",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Study",
	}
);
module.exports = Study;
