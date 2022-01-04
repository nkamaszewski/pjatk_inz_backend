const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const University = sequelize.define(
	"University",
	{
		IdUniversity: {
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
					msg: "Należy podać nazwę uczelni",
				},
				notNull: {
					msg: "Należy podać nazwę uczelni",
				},
				len: {
					args: [5, 255],
					msg: "Pole powinno zawierać od 5 do 255 znaków",
				},
			},
		},
		ShortName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: "Należy podać nazwę uczelni",
				},
				notNull: {
					msg: "Należy podać nazwę uczelni",
				},
				len: {
					args: [2, 10],
					msg: "Pole powinno zawierać od 2 do 10 znaków",
				},
			},
		},
		City: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy podać miasto",
				},
				notNull: {
					msg: "Należy podać miasto",
				},
			},
		},
		PostalCode: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy podać kod pocztowy",
				},
				notNull: {
					msg: "Należy podać kod pocztowy",
				},
			},
		},
		Street: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy podać ulicę",
				},
				notNull: {
					msg: "Należy podać ulicę",
				},
			},
		},
		Number: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy podać numer",
				},
				notNull: {
					msg: "Należy podać numer",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "University",
	}
);
module.exports = University;
