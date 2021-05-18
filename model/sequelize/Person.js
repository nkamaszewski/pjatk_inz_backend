const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Person = sequelize.define('Person', {
    idPerson: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    FirstName: { type: Sequelize.STRING, allowNull: false },
	LastName: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false },	
    Phone: { type: Sequelize.STRING, allowNull: false }	
}, {
    timestamps: false,
    tableName: 'Person'
});
module.exports = Person;