const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Department = sequelize.define('Department', {
    IdDepartment: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: {
        type: Sequelize.STRING, allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 255],
                msg: "Pole powinno zawierać od 2 do 255 znaków"
            }
        }
    },
    IdDivision: { type: Sequelize.INTEGER, allowNull: false },
}, {
    timestamps: false,
    tableName: 'Department',
    indexes: [
        {
            name: 'idx_department_idDivision',
            fields: ['IdDivision']
        }
    ]
});
module.exports = Department;