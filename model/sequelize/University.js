const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Study = sequelize.define('Study', {
    idUniversity: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: { type: Sequelize.STRING, allowNull: false },
	ShortName: { type: Sequelize.STRING, allowNull: false },
	City: { type: Sequelize.STRING, allowNull: false },
	PostalCode: { type: Sequelize.STRING, allowNull: false },
	Street: { type: Sequelize.STRING, allowNull: false },
	Number: { type: Sequelize.STRING, allowNull: false }
	}, {
    timestamps: false,
    tableName: 'Study'
});
module.exports = Study;