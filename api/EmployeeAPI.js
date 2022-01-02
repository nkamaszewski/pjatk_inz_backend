const EmployeeRepository = require("../repository/sequelize/EmployeeRepository");
const Role = require("../model/Role");

exports.getEmployees = (req, res, next) => {
	EmployeeRepository.getEmployees()
		.then((emps) => {
			res.status(200).json(emps);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEmployeeById = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getEmployeeById(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "Employee with id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.createEmployee = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	EmployeeRepository.createEmployee(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje w systemie pracownik z takim nr PESEL`,
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
					message: `Nie udało się zaktualizować danych pracownika`,
				});
			}
		});
};

exports.updateEmployee = (req, res, next) => {
	const empId = req.params.empId;
	if (req.userIdRole != Role.ADMIN || req.userIdUser != empId) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}

	EmployeeRepository.updateEmployee(empId, req.body)
		.then((result) => {
			res.status(200).json({ message: "Employee updated!", emp: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Ta osoba jest już zdefiniowana jako pracownik`,
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
					message: `Nie udało się zaktualizować danych pracownika`,
				});
			}
		});
};

exports.deleteEmployee = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.deleteEmployee(empId)
		.then((result) => {
			res.status(200).json({
				message: "Usunięto pracownika",
				emp: result,
			});
		})
		.catch((err) => {
			if (err.name === "SequelizeForeignKeyConstraintError") {
				res.status(403).json({
					message:
						"Nie można usunąć pracownika, który posiada powiązane dane",
				});
			} else {
				err.statusCode = 500;
				res.status(403).json({
					message: "Nie udało się usunąć szkoleniowca!",
				});
			}
		});
};

exports.getQuestionnaireOffersByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getQuestionnaireOffersByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "QuestionnaireOffer for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.getApplicationsForByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getApplicationsForByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "ApplicationFor for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.getAppStudiesByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getAppStudiesByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "ApplicationFor for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.getAppTrainingsByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getAppTrainingsByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "ApplicationFor for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.getAppOthersByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getAppOthersByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "ApplicationFor for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.getParticipationsByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getParticipationsByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "Participations for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.getPartStudiesByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getPartStudiesByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "Participations for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.getPartTrainingsByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getPartTrainingsByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "Participations for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.getPartOthersByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	EmployeeRepository.getPartOthersByEmpId(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: "Participations for id: " + empId + " not found",
			});
		} else {
			res.status(200).json(emp);
		}
	});
};
