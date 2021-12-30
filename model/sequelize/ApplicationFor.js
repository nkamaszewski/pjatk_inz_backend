const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ApplicationFor = sequelize.define('ApplicationFor', {
    IdApplicationFor: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    DateOfSubmission: { type: Sequelize.DATE, allowNull: false },
    IdEducation: { type: Sequelize.INTEGER, allowNull: false },
    Compatibility: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    IdStatus: { type: Sequelize.INTEGER, allowNull: false }
}, {
    timestamps: false,
    tableName: 'ApplicationFor',
    indexes: [
        {
            name: 'idx_applicationFor_idStuatus',
            fields: ['IdStatus']
        },
        {
            name: 'idx_applicationFor_idPerson_idEducation',
            unique: true,
            fields: ['IdPerson', 'IdEducation'],
         },
    ]
});
module.exports = ApplicationFor;