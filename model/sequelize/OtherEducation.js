const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const OtherEducation = sequelize.define(
	"OtherEducation",
	{
		IdEducation: {
			type: Sequelize.INTEGER,
			autoIncrement: false,
			allowNull: false,
			primaryKey: true,
		},
		Name: { type: Sequelize.STRING, allowNull: false },
		IdCompany: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać organizatora szkolenia",
				},
				isInt: {
					msg: "Należy podać organizatora szkolenia",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "OtherEducation",
		indexes: [
			{
				name: "idx_otherEducation",
				unique: true,
				fields: ["Name", "IdCompany"],
			},
		],
	}
);
module.exports = OtherEducation;
