const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Division = sequelize.define('Division', {
    IdDivision: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: {
        type: Sequelize.STRING, allowNull: false, unique: true,
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
}, {
    timestamps: false,
    tableName: 'Division'
});
module.exports = Division;