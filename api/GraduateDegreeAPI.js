const GraduateDegreeRepository = require("../repository/sequelize/GraduateDegreeRepository");

exports.getGraduateDegrees = (req, res, next) => {
	GraduateDegreeRepository.getGraduateDegrees()
		.then((gradDegs) => {
			res.status(200).json(gradDegs);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getGraduateDegreeById = (req, res, next) => {
	const gradDegId = req.params.gradDegId;
	GraduateDegreeRepository.getGraduateDegreeById(gradDegId).then((gradDeg) => {
		if (!gradDeg) {
			res.status(404).json({
				message: "Graduate degree with id: " + gradDegId + " not found",
			});
		} else {
			res.status(200).json(gradDeg);
		}
	});
};

exports.createGraduateDegree = (req, res, next) => {
	GraduateDegreeRepository.createGraduateDegree(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje stopień studiów o takiej nazwie`,
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
					message: `Nie udało się utworzyć stopnia studiów`,
				});
			}
		});
};

exports.updateGraduateDegree = (req, res, next) => {
	const gradDegId = req.params.gradDegId;
	GraduateDegreeRepository.updateGraduateDegree(gradDegId, req.body)
		.then((result) => {
			res
				.status(200)
				.json({ message: "Graduate degree updated!", gradDeg: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje stopień studiów o takiej nazwie`,
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
					message: `Nie udało się zaktualizować stopnia studiów`,
				});
			}
		});
};

exports.deleteGraduateDegree = (req, res, next) => {
	const gradDegId = req.params.gradDegId;
	GraduateDegreeRepository.deleteGraduateDegree(gradDegId)
		.then((result) => {
			res
				.status(200)
				.json({ message: "Removed Graduate degree", gradDeg: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeForeignKeyConstraintError") {
				res.status(403).json({
					message:
						"Nie można usunąć stopnia studniów ze względu na przypisania do studiów",
				});
			} else {
				err.statusCode = 500;
				res.status(403).json({
					message: "Nie udało się usunąć stopnia studniów!",
				});
			}
		});
};
