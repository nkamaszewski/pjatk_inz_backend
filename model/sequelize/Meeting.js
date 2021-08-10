const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Meeting = sequelize.define('Meeting', {
	IdMeeting: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	From: {
		type: Sequelize.DATE, allowNull: true,
		validate: {
			notEmpty: {
				msg: "Pole jest wymagane"
			},
			isDate: {
				msg: 'Pole powinno zawierać prawidłową datę'
			}
		}
	},
	To: {
		type: Sequelize.DATE, allowNull: true,
		validate: {
			notEmpty: {
				msg: "Pole jest wymagane"
			},
			isDate: {
				msg: 'Pole powinno zawierać prawidłową datę'
			}
		}
	},
	IdGroup: { type: Sequelize.INTEGER, allowNull: true },
	IdRoom: { type: Sequelize.INTEGER, allowNull: true }
}, {
	timestamps: false,
	tableName: 'Meeting',
	indexes: [
		{
			name: 'idx_meeting_idGroup',
			fields: ['IdGroup']
		},
		{
			name: 'idx_meeting_idRoom',
			fields: ['IdRoom']
		}
	]
});
module.exports = Meeting;