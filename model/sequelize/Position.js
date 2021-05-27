const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Position = sequelize.define('Position', {
    IdPosition: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'Position'
});
module.exports = Position;