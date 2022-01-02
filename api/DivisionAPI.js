const DivisionRepository = require("../repository/sequelize/DivisionRepository");
const Role = require("../model/Role");

exports.getDivisions = (req, res, next) => {
	DivisionRepository.getDivisions()
		.then((divs) => {
			res.status(200).json(divs);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getDivisionById = (req, res, next) => {
	const divId = req.params.divId;
	DivisionRepository.getDivisionById(divId).then((div) => {
		if (!div) {
			res.status(404).json({
				message: "Division with id: " + divId + " not found",
			});
		} else {
			res.status(200).json(div);
		}
	});
};

exports.createDivision = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	DivisionRepository.createDivision(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje pion o takiej nazwie`,
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
					message: `Nie udało się utworzyć pionu`,
				});
			}
		});
};

exports.updateDivision = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	const divId = req.params.divId;
	DivisionRepository.updateDivision(divId, req.body)
		.then((result) => {
			res.status(200).json({ message: "Division updated!", div: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje pion o takiej nazwie`,
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
					message: `Nie udało się utworzyć pionu`,
				});
			}
		});
};

exports.deleteDivision = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	const divId = req.params.divId;
	DivisionRepository.deleteDivision(divId)
		.then((result) => {
			res.status(200).json({ message: "Pion usunięto", div: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeForeignKeyConstraintError") {
				res.status(403).json({
					message:
						"Nie można usunąć pionu ze względu na przypisane wydziały",
				});
			} else {
				err.statusCode = 500;
				res.status(403).json({
					message: "Nie udało się usunąć pionu!",
				});
			}
		});
};
