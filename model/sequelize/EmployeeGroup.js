const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const EmployeeGroup = sequelize.define('EmployeeGroup', {
    IdEmployeeGroup: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    IdGroup: { type: Sequelize.INTEGER, allowNull: false },
    IdPerson: { type: Sequelize.INTEGER, allowNull: false }
}, {
    timestamps: false,
    tableName: 'EmployeeGroup',
    indexes: [
        {
            name: 'idx_employeeGroup',
            unique: true,
            fields: ['IdGroup', 'IdPerson']
        }
    ]
});
module.exports = EmployeeGroup;