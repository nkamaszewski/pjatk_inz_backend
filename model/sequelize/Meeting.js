const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Meeting = sequelize.define('Meeting', {
	IdMeeting: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	From: { type: Sequelize.DATE, allowNull: true },
	To: { type: Sequelize.DATE, allowNull: true },
	IdGroup: { type: Sequelize.INTEGER, allowNull: true },
	IdRoom: { type: Sequelize.INTEGER, allowNull: true }
}, {
	timestamps: false,
	tableName: 'Meeting'
});
module.exports = Meeting;