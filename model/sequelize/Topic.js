const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Topic = sequelize.define(
	"Topic",
	{
		IdTopic: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Topic: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: "Należy podać temat szkolenia",
				},
				notEmpty: {
					msg: "Należy podać temat szkolenia",
				},
			},
		},
		IdSubject: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy wybrać tematykę",
				},
				isInt: {
					msg: "Należy wybrać tematykę",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Topic",
		indexes: [
			{
				name: "idx_topic_idSubiect",
				fields: ["IdSubject"],
			},
			{
				name: "idx_topic_topic",
				fields: ["Topic"],
			},
		],
	}
);
module.exports = Topic;
