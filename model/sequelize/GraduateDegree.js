const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const GraduateDegree = sequelize.define(
	"GraduateDegree",
	{
		IdGraduateDegree: {
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
					msg: "Należy podać stopień studiów",
				},
				notEmpty: {
					msg: "Należy podać stopień studiów",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "GraduateDegree",
	}
);
module.exports = GraduateDegree;
