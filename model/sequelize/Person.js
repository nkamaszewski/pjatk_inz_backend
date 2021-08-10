const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Person = sequelize.define('Person', {
    IdPerson: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    FirstName: {
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
    LastName: {
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
    Email: {
        type: Sequelize.STRING, allowNull: false, unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [4, 255],
                msg: "Pole powinno zawierać od 4 do 255 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
        }
    },
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