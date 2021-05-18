const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Meeting = sequelize.define('Meeting', {
    idMeeting: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Date: { type: Sequelize.DATE, allowNull: false },
	HourFrom: { type: Sequelize.DATE, allowNull: false },
	HourTo: { type: Sequelize.DATE, allowNull: true}
	IdGroup: { type: Sequelize.INTEGER, allowNull: true },
	IdRoom: { type: Sequelize.INTEGER, allowNull: true}
	}, {
    timestamps: false,
    tableName: 'Meeting'
});
module.exports = Meeting;