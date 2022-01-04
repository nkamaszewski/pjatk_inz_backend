const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const StudyMode = sequelize.define(
	"StudyMode",
	{
		IdStudyMode: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: "Należy podać nazwę trybu studiów",
				},
				notEmpty: {
					msg: "Należy podać nazwę trybu studiów",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "StudyMode",
	}
);
module.exports = StudyMode;
