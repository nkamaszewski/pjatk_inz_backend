const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Employee = sequelize.define('Employee', {
    IdPerson: { type: Sequelize.INTEGER, autoIncrement: false, allowNull: false, primaryKey: true },
    Pesel: { type: Sequelize.STRING, allowNull: false },
    Password: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'Employee',
    indexes: [
        {
            name: 'idx_employee_pesel',
            unique: true,
            fields: ['Pesel']
        }
    ]
});
module.exports = Employee;