const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Status = sequelize.define('Status', {
    IdStatus: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Name: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'Status'
});
module.exports = Status;