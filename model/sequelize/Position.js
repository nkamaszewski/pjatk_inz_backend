const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Position = sequelize.define('Position', {
    IdPosition: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: {
        type: Sequelize.STRING, allowNull: false, unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 255],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            }
        }
    }
}, {
    timestamps: false,
    tableName: 'Position'
});
module.exports = Position;