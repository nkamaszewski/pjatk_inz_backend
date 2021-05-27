const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Division = sequelize.define('Division', {
    IdDivision: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: { type: Sequelize.STRING, allowNull: false },
}, {
    timestamps: false,
    tableName: 'Division'
});
module.exports = Division;