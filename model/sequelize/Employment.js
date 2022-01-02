const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Employment = sequelize.define(
	"Employment",
	{
		IdEmployment: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		DateFrom: {
			type: Sequelize.DATE,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy wstawić datę początkową zatrudnienia",
				},
				notEmpty: {
					msg: "Należy wstawić datę początkową zatrudnienia",
				},
				isDate: {
					msg: "Pole powinno być prawidłową datą",
				},
			},
		},
		DateTo: {
			type: Sequelize.DATE,
			allowNull: true,
			validate: {
				isDate: {
					msg: "Pole powinno być prawidłową datą",
				},
				isLessThanDateFrom(value) {
					if (value && value <= this.DateFrom) {
						throw new Error(
							"Data końcowa musi być późniejsza niż początkowa"
						);
					}
				},
			},
		},
		IdDepartment: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		IdDivision: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		IdPosition: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy wybrać stanowisko pracownika",
				},
				notEmpty: {
					msg: "Należy wybrać stanowisko pracownika",
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
			},
		},
	},
	{
		timestamps: false,
		tableName: "Employment",
		indexes: [
			{
				name: "idx_employment_idDepartment",
				fields: ["IdDepartment"],
			},
			{
				name: "idx_employment_idPosition",
				fields: ["IdPosition"],
			},
			{
				name: "idx_employment_idPerson",
				fields: ["IdPerson"],
			},
		],
	}
);
module.exports = Employment;
