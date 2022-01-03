const MeetingRepository = require("../repository/sequelize/MeetingRepository");
const { mapToMeetingList } = require("../mappers/mapToMeetingList");

exports.getMeetings = (req, res, next) => {
	const { query } = req;
	MeetingRepository.getMeetings(query)
		.then((meets) => {
			const meetingsList = mapToMeetingList(meets);
			res.status(200).json(meetingsList);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getMeetingById = (req, res, next) => {
	const meetId = req.params.meetId;

	MeetingRepository.getMeetingById(meetId).then((meet) => {
		if (!meet) {
			res.status(404).json({
				message: "Meeting with id: " + meetId + " not found",
			});
		} else {
			res.status(200).json(meet);
		}
	});
};

exports.createMeeting = (req, res, next) => {
	MeetingRepository.createMeeting(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeValidationError") {
				let message = "";
				for (let m of err.errors) {
					message += m.message + "\n";
				}
				res.status(403).json({
					message,
				});
			} else {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				res.status(403).json({
					message: `Nie udało się zaktualizować spotkania`,
				});
			}
		});
};

exports.updateMeeting = (req, res, next) => {
	const meetId = req.params.meetId;
	MeetingRepository.updateMeeting(meetId, req.body)
		.then((result) => {
			res.status(200).json({
				message: "Spotkanie zaktualizowane!",
				meet: result,
			});
		})
		.catch((err) => {
			if (err.name === "SequelizeValidationError") {
				let message = "";
				for (let m of err.errors) {
					message += m.message + "\n";
				}
				res.status(403).json({
					message,
				});
			} else {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				res.status(403).json({
					message: `Nie udało się zaktualizować spotkania`,
				});
			}
		});
};

exports.deleteMeeting = (req, res, next) => {
	const meetId = req.params.meetId;
	MeetingRepository.deleteMeeting(meetId)
		.then((result) => {
			res.status(200).json({
				message: "Spotkanie usunięto",
				meet: result,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
