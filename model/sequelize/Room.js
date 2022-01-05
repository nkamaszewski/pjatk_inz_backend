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
					msg: "Należy podać nazwę sali",
				},
				len: {
					args: [1, 20],
					msg: "Nazwa sali powinna mieć między 1 a 20 znaków",
				},
			},
		},
		Area: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy podać powierzchnię sali",
				},
				isNumeric: {
					msg: "Powierzchnia sali powinna być liczbą",
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
					msg: "Należy podać pojemność sali",
				},
				isNumeric: {
					msg: "Pojemność sali musi być liczbą",
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
					msg: "Pojemność sali musi być liczbą",
				},
			},
		},
		CapacitySet3: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: "Pojemność sali musi być liczbą",
				},
			},
		},
		CapacitySet4: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: "Pojemność sali musi być liczbą",
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
