const DepartmentRepository = require("../repository/sequelize/DepartmentRepository");
const Role = require("../model/Role");

exports.getDepartments = (req, res, next) => {
	DepartmentRepository.getDepartments()
		.then((deps) => {
			res.status(200).json(deps);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getDepartmentById = (req, res, next) => {
	const depId = req.params.depId;
	DepartmentRepository.getDepartmentById(depId).then((dep) => {
		if (!dep) {
			res.status(404).json({
				message: "Department with id: " + depId + " not found",
			});
		} else {
			res.status(200).json(dep);
		}
	});
};

exports.createDepartment = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	DepartmentRepository.createDepartment(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje wydział o takiej nazwie w tym pionie`,
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
					message: `Nie udało się utworzyć wydziału`,
				});
			}
		});
};

exports.updateDepartment = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	const depId = req.params.depId;
	DepartmentRepository.updateDepartment(depId, req.body)
		.then((result) => {
			res.status(200).json({
				message: "Dane wydziału zaktualizowano!",
				dep: result,
			});
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje wydział o takiej nazwie w tym pionie`,
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
					message: `Nie udało się zaktualizować wydziału`,
				});
			}
		});
};

exports.deleteDepartment = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	const depId = req.params.depId;
	DepartmentRepository.deleteDepartment(depId)
		.then((result) => {
			res.status(200).json({
				message: "Wydział usunięto",
				dep: result,
			});
		})
		.catch((err) => {
			if (err.name === "SequelizeForeignKeyConstraintError") {
				res.status(403).json({
					message:
						"Nie można usunąć wydziału, w którym są zatrudnione osoby",
				});
			} else {
				err.statusCode = 500;
				res.status(403).json({
					message: "Nie udało się usunąć wydziału!",
				});
			}
		});
};
