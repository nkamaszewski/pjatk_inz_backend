const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Employee = sequelize.define('Employee', {
    idEmployee: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Pesel: { type: Sequelize.STRING, allowNull: false },
    Password: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'Employee'
});
module.exports = Employee;