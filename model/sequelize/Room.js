const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Room = sequelize.define(
	"Room",
	{
		IdRoom: {
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
				notEmpty: {
					msg: "Pole jest wymagane",
				},
				len: {
					args: [1, 20],
					msg: "Pole powinno zawierać od 1 do 20 znaków",
				},
			},
		},
		Area: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Pole jest wymagane",
				},
				isNumeric: {
					msg: "Pole powinno zawierać liczbę",
				},
				min: {
					args: 2,
					msg: "Minimalna powierzchnia sali to 10",
				},
			},
		},
		CapacitySet1: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: "Pole jest wymagane",
				},
				isNumeric: {
					msg: "Pole powinno zawierać liczbę",
				},
				min: {
					args: 2,
					msg: "Minimalna pojemność sali to 2",
				},
			},
		},
		CapacitySet2: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: "Pole powinno zawierać liczbę",
				},
			},
		},
		CapacitySet3: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: "Pole powinno zawierać liczbę",
				},
			},
		},
		CapacitySet4: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: "Pole powinno zawierać liczbę",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Room",
	}
);
module.exports = Room;
