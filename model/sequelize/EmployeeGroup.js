const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const EmployeeGroup = sequelize.define('EmployeeGroup', {
    idEmployeeGroup: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	IdGroup: { type: Sequelize.INTEGER, allowNull: false },
	IdPerson: { type: Sequelize.INTEGER, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'EmployeeGroup'
});
module.exports = EmployeeGroup;