const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ApplicationForRefund = sequelize.define('ApplicationForRefund', {
    idApplicationForRefund: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    idApplicationFor: { type: Sequelize.INTEGER, allowNull: false },
    IdStatus: { type: Sequelize.INTEGER, allowNull: false },
    DateOfSubmission: { type: Sequelize.DATE, allowNull: false }
}, {
    timestamps: false,
    tableName: 'ApplicationForRefund'
});
module.exports = ApplicationForRefund;