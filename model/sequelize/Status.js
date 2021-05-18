const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Status = sequelize.define('Status', {
    idStatus: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: { type: Sequelize.String, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'Status'
});
module.exports = Status;