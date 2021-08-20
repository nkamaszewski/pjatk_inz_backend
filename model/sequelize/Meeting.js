const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const Op = Sequelize.Op;

const Meeting = sequelize.define('Meeting', {
	IdMeeting: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	From: {
		type: Sequelize.DATE, allowNull: true,
		validate: {
			isDate: {
				msg: 'Pole powinno być prawidłową datą'
			},
			isAvailable(value, next) {
				const roomId = this.IdRoom;
				const toDate = this.To;
				Meeting.findAll({
					where: {
						[Op.or]: [
							{
								From: { [Op.lte]: value },
								To: { [Op.gte]: value }
							},
							{
								From: { [Op.gte]: value },
								To: { [Op.lte]: toDate }
							}
						],
						IdRoom: roomId
					}
				})
					.then((meeting) => {
						if (meeting.length != 0)
							next(new Error(`Sala ${roomId} o godz. ${value} zajęta!`));
						next();
					})
					.catch((onError) => console.log(onError));
			}
		}
	},
	To: {
		type: Sequelize.DATE, allowNull: true,
		validate: {
			isDate: {
				msg: 'Pole powinno być prawidłową datą'
			},
			isLessThanFrom(value) {
				if (value <= this.From) {
					throw new Error(`Data końcowa musi być późniejsza niż początkowa`);
				}
			},
			isAvailable(value, next) {
				const roomId = this.IdRoom
				Meeting.findAll({
					where: {
						From: {
							[Op.lte]: value
						},
						To: {
							[Op.gte]: value
						},
						IdRoom: roomId
					}
				})
					.then((meeting) => {
						if (meeting.length != 0)
							next(new Error(`Sala ${roomId} o godz. ${value} zajęta!`));
						next();
					})
					.catch((onError) => console.log(onError));
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