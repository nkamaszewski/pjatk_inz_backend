const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const GraduateDegree = sequelize.define('GraduateDegree', {
    IdGraduateDegree: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'GraduateDegree'
});
module.exports = GraduateDegree;