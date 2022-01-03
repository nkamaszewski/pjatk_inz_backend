const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Training = sequelize.define(
	"Training",
	{
		IdEducation: {
			type: Sequelize.INTEGER,
			autoIncrement: false,
			allowNull: false,
			primaryKey: true,
		},
		IdTopic: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy wybrać temat szkolenia",
				},
				isInt: {
					msg: "Należy wybrać temat szkolenia",
				},
			},
		},
		IdCompany: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy wybrać organizatora szkolenia",
				},
				isInt: {
					msg: "Należy wybrać organizatora szkolenia",
				},
			},
		},
		IdPerson: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy wybrać prowadzącego szkolenie",
				},
				isInt: {
					msg: "Należy wybrać prowadzącego szkolenie",
				},
			},
		},
		Internal: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
		DateFrom: {
			type: Sequelize.DATE,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Data początkowa nie może być pusta",
				},
				isDate: {
					msg: "Pole powinno być prawidłową datą",
				},
			},
		},
		DateTo: {
			type: Sequelize.DATE,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Data końcowa nie może być pusta",
				},
				isDate: {
					msg: "Pole powinno być prawidłową datą",
				},
				isLessThanFrom(value) {
					if (value < this.DateFrom) {
						console.log("To " + value);
						console.log("To " + this.DateFrom);
						throw new Error(
							`Data końcowa musi być późniejsza niż początkowa`
						);
					}
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Training",
		indexes: [
			{
				name: "idx_training_idTopic",
				fields: ["IdTopic"],
			},
			{
				name: "idx_training_idCompany",
				fields: ["IdCompany"],
			},
			{
				name: "idx_training_idPerson",
				fields: ["IdPerson"],
			},
		],
	}
);
module.exports = Training;
