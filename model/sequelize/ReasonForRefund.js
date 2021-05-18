const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ReasonForRefund = sequelize.define('ReasonForRefund', {
    idReasonForRefund: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: { type: Sequelize.String, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'ReasonForRefund'
});
module.exports = ReasonForRefund;