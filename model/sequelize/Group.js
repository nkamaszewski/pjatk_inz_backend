const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Group = sequelize.define(
	"Group",
	{
		IdGroup: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać symbol grupy",
				},
				notEmpty: {
					msg: "Należy podać symbol grupy",
				},
			},
		},
		NumberOfPerson: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać liczebność grupy",
				},
				isInt: {
					msg: "Liczebność grupy musi być liczbą całkowitą",
				},
			},
		},
		IdEducation: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać szkolenie do którego przypisywana jest grupa",
				},
				isInt: {
					msg: "Należy podać szkolenie do którego przypisywana jest grupa",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Group",
		indexes: [
			{
				name: "idx_group_idEducation",
				fields: ["IdEducation"],
			},
		],
	}
);
module.exports = Group;
