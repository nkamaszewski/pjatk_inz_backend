const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Subject = sequelize.define(
	"Subject",
	{
		IdSubject: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Subject: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać tematykę",
				},
				notEmpty: {
					msg: "Należy podać tematykę",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Subject",
	}
);
module.exports = Subject;
