const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Group = sequelize.define('Group', {
	IdGroup: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: { type: Sequelize.STRING, allowNull: false },
	NumberOfPerson: { type: Sequelize.INTEGER, allowNull: false },
	IdEducation: { type: Sequelize.INTEGER, allowNull: true }
}, {
	timestamps: false,
	tableName: 'Group'
});
module.exports = Group;