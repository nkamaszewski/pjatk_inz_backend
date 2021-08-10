const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Coach = sequelize.define('Coach', {
    IdPerson: { type: Sequelize.INTEGER, autoIncrement: false, allowNull: false, primaryKey: true },
    JobTitle: {
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
    }
}, {
    timestamps: false,
    tableName: 'Coach'
});
module.exports = Coach;