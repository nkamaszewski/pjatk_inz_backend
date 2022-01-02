const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Person = sequelize.define(
	"Person",
	{
		IdPerson: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		FirstName: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy wpisać imię",
				},
				notNull: {
					msg: "Należy wpisać imię",
				},
				len: {
					args: [2, 255],
					msg: "Pole powinno zawierać od 2 do 255 znaków",
				},
			},
		},
		LastName: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy wpisać nazwisko",
				},
				notNull: {
					msg: "Należy wpisać nazwisko",
				},
				len: {
					args: [2, 255],
					msg: "Pole powinno zawierać od 2 do 255 znaków",
				},
			},
		},
		Email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: "'Należy podać prawidłowy adres email",
				},
				notNull: {
					msg: "'Należy podać prawidłowy adres email",
				},
				isEmail: {
					msg: "Należy podać prawidłowy adres email",
				},
				len: {
					args: [4, 255],
					msg: "Pole powinno zawierać od 4 do 255 znaków",
				},
			},
		},
		Phone: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy wpisać numer telefonu",
				},
				notNull: {
					msg: "Należy wpisać numer telefonu",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Person",
		indexes: [
			{
				name: "idx_person_email",
				unique: true,
				fields: ["Email"],
			},
			{
				name: "idx_person_LastName_FirstName",
				fields: ["LastName", "FirstName"],
			},
		],
	}
);

module.exports = Person;
