const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Education = sequelize.define(
	"Education",
	{
		IdEducation: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Price: {
			type: Sequelize.DECIMAL,
			allowNull: false,
			defaultValue: 0,
			validate: {
				notNull: {
					msg: "Należy podać cenę szkolenia",
				},
				isNumeric: {
					msg: "Cena szkolenia musi być liczbą",
				},
			},
		},

		PriceAccommodation: {
			type: Sequelize.DECIMAL,
			allowNull: true,
			defaultValue: 0,
			validate: {
				isNumeric: {
					msg: "Cena szkolenia musi być liczbą",
				},
			},
		},
		PriceTransit: {
			type: Sequelize.DECIMAL,
			allowNull: true,
			defaultValue: 0,
			validate: {
				isNumeric: {
					msg: "Cena szkolenia musi być liczbą",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Education",
	}
);
module.exports = Education;
