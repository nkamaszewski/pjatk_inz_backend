const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Meeting = sequelize.define('Meeting', {
	IdMeeting: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	From: {
		type: Sequelize.DATE, allowNull: true,
		validate: {
			isDate: {
				msg: 'Pole powinno być prawidłową datą'
			}
		}
	},
	To: {
		type: Sequelize.DATE, allowNull: true,
		validate: {
			isDate: {
				msg: 'Pole powinno być prawidłową datą'
			},
			isGreaterThanFrom(value) {
				if (value <= this.From) {
					throw new Error('Data końcowa musi być późniejsza niż początkowa');
				}
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