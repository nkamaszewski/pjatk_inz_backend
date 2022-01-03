const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");
const Op = Sequelize.Op;

const Meeting = sequelize.define(
	"Meeting",
	{
		IdMeeting: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		From: {
			type: Sequelize.DATE,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać czas rozpoczęcia",
				},
				isDate: {
					msg: "Pole powinno być prawidłową datą",
				},
				isAvailable(value, next) {
					const roomId = this.IdRoom;
					const toDate = this.To;
					const meetingId = this.IdMeeting;
					Meeting.findAll({
						where: {
							IdMeeting: {
								[Op.ne]: meetingId,
							},
							[Op.or]: [
								{
									From: { [Op.lte]: value },
									To: { [Op.gte]: value },
								},
								{
									From: { [Op.gte]: value },
									To: { [Op.lte]: toDate },
								},
							],
							IdRoom: roomId,
						},
					})
						.then((meeting) => {
							if (meeting.length != 0)
								next(
									new Error(
										`Sala ${roomId} o godz. ${value} zajęta!`
									)
								);
							next();
						})
						.catch((onError) => console.log(onError));
				},
			},
		},
		To: {
			type: Sequelize.DATE,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać czas zakończenia",
				},
				isDate: {
					msg: "Pole powinno być prawidłową datą",
				},
				isLessThanFrom(value) {
					if (value <= this.From) {
						throw new Error(
							`Data końcowa musi być późniejsza niż początkowa`
						);
					}
				},
				isAvailable(value, next) {
					const roomId = this.IdRoom;
					const meetingId = this.IdMeeting;

					Meeting.findAll({
						where: {
							IdMeeting: {
								[Op.ne]: meetingId,
							},
							From: {
								[Op.lte]: value,
							},
							To: {
								[Op.gte]: value,
							},
							IdRoom: roomId,
						},
					})
						.then((meeting) => {
							if (meeting.length != 0)
								next(
									new Error(
										`Sala ${roomId} o godz. ${value} zajęta!`
									)
								);
							next();
						})
						.catch((onError) => console.log(onError));
				},
			},
		},
		IdGroup: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać grupę",
				},
				isInt: {
					msg: "Należy podać grupę",
				},
			},
		},
		IdRoom: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isCapacity(value, next) {
					const idGroup = this.IdGroup;
					sequelize.models.EmployeeGroup.findAndCountAll({
						where: {
							IdGroup: idGroup,
						},
					})
						.then((group) => {
							sequelize.models.Room.findByPk(value)
								.then((room) => {
									if (room.CapacitySet1 < group.count)
										next(
											new Error(
												`Liczba osób w grupie zbyt duża dla wybranej sali!`
											)
										);
									next();
								})
								.catch(next);
						})
						.catch((onError) => console.log(onError));
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "Meeting",
		indexes: [
			{
				name: "idx_meeting_idGroup",
				fields: ["IdGroup"],
			},
			{
				name: "idx_meeting_idRoom",
				fields: ["IdRoom"],
			},
		],
	}
);
module.exports = Meeting;
