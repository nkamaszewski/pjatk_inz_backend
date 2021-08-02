const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Employment = sequelize.define('Employment', {
    IdEmployment: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    DateFrom: { type: Sequelize.DATE, allowNull: false },
    DateTo: { type: Sequelize.DATE, allowNull: true },
    IdDepartment: { type: Sequelize.INTEGER, allowNull: false },
    IdPosition: { type: Sequelize.INTEGER, allowNull: false },
    IdPerson: { type: Sequelize.INTEGER, allowNull: false }
}, {
    timestamps: false,
    tableName: 'Employment',
    indexes: [
        {
            name: 'idx_employment_idDepartment',
            fields: ['IdDepartment']
        },
        {
            name: 'idx_employment_idPosition',
            fields: ['IdPosition']
        },
        {
            name: 'idx_employment_idPerson',
            fields: ['IdPerson']
        }
    ]
});
module.exports = Employment;