const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ApplicationFor = sequelize.define('ApplicationFor', {
    IdApplicationFor: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    DateOfSubmission: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    IdEducation: { type: Sequelize.INTEGER, allowNull: false, validate: {
        notNull: {
            msg: "Wybór szkolenia jest wymagany!"
        },
        isInt: {
            msg: "Wybór szkolenia jest wymagany!"
        }
    }},
    Compatibility: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    IdStatus: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1, validate: {
        notNull: {
            msg: "Wybór statusu jest wymagany!"
        },
        isInt: {
            msg: "Wybór statusu jest wymagany!"
        }
    }},
    IdPerson: { type: Sequelize.INTEGER, allowNull: false, validate: {
        notNull: {
            msg: "Wybór osoby jest wymagany!"
        }}}}, {
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