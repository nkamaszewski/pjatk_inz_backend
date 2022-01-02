const CoachRepository = require("../repository/sequelize/CoachRepository");

exports.getCoachs = (req, res, next) => {
	CoachRepository.getCoachs()
		.then((coachs) => {
			res.status(200).json(coachs);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCoachById = (req, res, next) => {
	const coachId = req.params.coachId;
	CoachRepository.getCoachById(coachId).then((coach) => {
		if (!coach) {
			res.status(404).json({
				message: "Coach with id: " + coachId + " not found",
			});
		} else {
			res.status(200).json(coach);
		}
	});
};

exports.createCoach = (req, res, next) => {
	CoachRepository.createCoach(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Ta osoba jest już zdefiniowana jako szkoleniowiec`,
				});
			} else if (err.name === "SequelizeValidationError") {
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
					message: `Nie udało się zaktualizować szkoleniowca`,
				});
			}
		});
};

exports.updateCoach = (req, res, next) => {
	const coachId = req.params.coachId;
	CoachRepository.updateCoach(coachId, req.body)
		.then((result) => {
			res.status(200).json({ message: "Coach updated!", coach: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Ta osoba jest już zdefiniowana jako szkoleniowiec`,
				});
			} else if (err.name === "SequelizeValidationError") {
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
					message: `Nie udało się zaktualizować szkoleniowca`,
				});
			}
		});
};

exports.deleteCoach = (req, res, next) => {
	const coachId = req.params.coachId;
	CoachRepository.deleteCoach(coachId)
		.then((result) => {
			res.status(200).json({
				message: "Usunięto szkoleniowca",
				coach: result,
			});
		})
		.catch((err) => {
			if (err.name === "SequelizeForeignKeyConstraintError") {
				res.status(403).json({
					message:
						"Nie można usunąć szkoleniowca, który ma przypisane szkolenia",
				});
			} else {
				err.statusCode = 500;
				res.status(403).json({
					message: "Nie udało się usunąć szkoleniowca!",
				});
			}
		});
};
