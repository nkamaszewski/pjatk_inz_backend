const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Person = sequelize.define('Person', {
    IdPerson: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    FirstName: { type: Sequelize.STRING, allowNull: false },
    LastName: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false },
    Phone: { type: Sequelize.STRING, allowNull: false }
},
    {
        timestamps: false,
        tableName: 'Person',
        indexes: [
            {
                name: 'idx_person_email',
                unique: true,
                fields: ['Email']
            },
            {
                name: 'idx_person_LastName_FirstName',
                fields: ['LastName', 'FirstName']
            }
        ]
    }
);

module.exports = Person;