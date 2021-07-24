const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Coach = sequelize.define('Coach', {
    IdPerson: { type: Sequelize.INTEGER, autoIncrement: false, allowNull: false, primaryKey: true },
    JobTitle: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'Coach'
});
module.exports = Coach;