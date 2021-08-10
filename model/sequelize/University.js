const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const University = sequelize.define('University', {
	IdUniversity: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: {
		type: Sequelize.STRING, allowNull: false, unique: true,
		validate: {
			notEmpty: {
				msg: "Pole jest wymagane"
			},
			len: {
				args: [5, 60],
				msg: "Pole powinno zawierać od 5 do 255 znaków"
			}
		}
	},
	ShortName: {
		type: Sequelize.STRING, allowNull: false, unique: true,
		validate: {
			notEmpty: {
				msg: "Pole jest wymagane"
			},
			len: {
				args: [2, 10],
				msg: "Pole powinno zawierać od 2 do 10 znaków"
			}
		}
	},
	City: { type: Sequelize.STRING, allowNull: false },
	PostalCode: { type: Sequelize.STRING, allowNull: false },
	Street: { type: Sequelize.STRING, allowNull: false },
	Number: { type: Sequelize.STRING, allowNull: false }
}, {
	timestamps: false,
	tableName: 'University'
});
module.exports = University;