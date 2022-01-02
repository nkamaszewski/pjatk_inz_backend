const PersonRepository = require("../repository/sequelize/PersonRepository");
const Role = require("../model/Role");

exports.getPersons = (req, res, next) => {
	PersonRepository.getPersons()
		.then((pers) => {
			res.status(200).json(pers);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getPersonById = (req, res, next) => {
	const perId = req.params.perId;
	PersonRepository.getPersonById(perId).then((per) => {
		if (!per) {
			res.status(404).json({
				message: "Person with id: " + perId + " not found",
			});
		} else {
			res.status(200).json(per);
		}
	});
};

exports.createPerson = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	PersonRepository.createPerson(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje osoba o takim adresie email`,
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
					message: `Nie udało się dodać osoby`,
				});
			}
		});
};

exports.updatePerson = (req, res, next) => {
	const perId = req.params.perId;

	if (req.userId != perId && req.userIdRole != Role.ADMIN) {
		console.log("Brak uprawnień");
		res.status(403).json({
			message: "Brak uprawnień",
		});
	} else {
		PersonRepository.updatePerson(perId, req.body)
			.then(async () => {
				const Person = await PersonRepository.getPersonById(perId);
				res.status(200).json({ Person });
			})
			.catch((err) => {
				if (err.name === "SequelizeUniqueConstraintError") {
					res.status(403).json({
						message: `Istnieje osoba o takim adresie email`,
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
						message: `Nie udało się zaktualizować osoby`,
					});
				}
			});
	}
};

exports.deletePerson = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	const perId = req.params.perId;
	PersonRepository.deletePerson(perId)
		.then((result) => {
			res.status(200).json({ message: "Osobę usunięto", per: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			res.status(403).json({
				message: "Nie udało się usunąć osoby!",
			});
		});
};
