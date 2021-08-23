const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Role = sequelize.define('Role', {
	IdRole: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: {
		type: Sequelize.STRING, allowNull: false, unique: true,
		validate: {
			notEmpty: {
				msg: "Pole jest wymagane"
			},
			len: {
				args: [1, 20],
				msg: "Pole powinno zawierać od 1 do 20 znaków"
			}
		}
	}
}, {
	timestamps: false,
	tableName: 'Role'
});
module.exports = Role;