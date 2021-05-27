const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Department = sequelize.define('Department', {
    IdDepartment: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: { type: Sequelize.STRING, allowNull: false },
    IdDivision: { type: Sequelize.INTEGER, allowNull: false },
}, {
    timestamps: false,
    tableName: 'Department'
});
module.exports = Department;