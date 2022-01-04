const StudyModeRepository = require("../repository/sequelize/StudyModeRepository");

exports.getStudyModes = (req, res, next) => {
	StudyModeRepository.getStudyModes()
		.then((studMods) => {
			res.status(200).json(studMods);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getStudyModeById = (req, res, next) => {
	const studModId = req.params.studModId;
	StudyModeRepository.getStudyModeById(studModId).then((studMod) => {
		if (!studMod) {
			res.status(404).json({
				message: "Study mode with id: " + studModId + " not found",
			});
		} else {
			res.status(200).json(studMod);
		}
	});
};

exports.createStudyMode = (req, res, next) => {
	StudyModeRepository.createStudyMode(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje tryb studiów o takiej nazwie`,
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
					message: `Nie udało się utworzyć trybu studiów`,
				});
			}
		});
};

exports.updateStudyMode = (req, res, next) => {
	const studModId = req.params.studModId;
	StudyModeRepository.updateStudyMode(studModId, req.body)
		.then((result) => {
			res.status(200).json({ message: "Study mode updated!", studMod: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje tryb studiów o takiej nazwie`,
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
					message: `Nie udało się zaktualizować trybu studiów`,
				});
			}
		});
};

exports.deleteStudyMode = (req, res, next) => {
	const studModId = req.params.studModId;
	StudyModeRepository.deleteStudyMode(studModId)
		.then((result) => {
			res.status(200).json({ message: "Removed Study mode", studMod: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeForeignKeyConstraintError") {
				res.status(403).json({
					message: "Nie można usunąć trybu ze względu na przypisane studia",
				});
			} else {
				err.statusCode = 500;
				res.status(403).json({
					message: "Nie udało się usunąć trybu studiów!",
				});
			}
		});
};
