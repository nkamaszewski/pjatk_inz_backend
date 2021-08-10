const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Employee = sequelize.define('Employee', {
    IdPerson: { type: Sequelize.INTEGER, autoIncrement: false, allowNull: false, primaryKey: true },
    Pesel: {
        type: Sequelize.STRING, allowNull: false, unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [11, 11],
                msg: "Pole powinno zawierać 11 znaków"
            },
            isNumeric: {
                msg: 'Pole powinno zawierać tylko cyfry'
            }
        }
    },
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