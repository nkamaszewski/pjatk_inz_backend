const EmploymentRepository = require('../repository/sequelize/EmploymentRepository');
const Role = require('../model/Role');
const { mapToEmploymentList } = require('../mappers/mapToEmploymentList');

exports.getEmployments = (req, res, next) => {
	const uId = req.userId;
	const uIdDepartment = req.userIdDepartment;
	const uIdDivision = req.userIdDivision;
	const uIdRole = req.userIdRole;

	EmploymentRepository.getEmployments(uId, uIdDepartment, uIdDivision, uIdRole)
		.then((emps) => {
			const mappedEmps = mapToEmploymentList(emps);
			res.status(200).json(mappedEmps);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEmploymentById = (req, res, next) => {
	const empId = req.params.empId;
	EmploymentRepository.getEmploymentById(empId).then((emp) => {
		if (!emp) {
			res.status(404).json({
				message: 'Employment with id: ' + empId + ' not found',
			});
		} else {
			res.status(200).json(emp);
		}
	});
};

exports.createEmployment = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		EmploymentRepository.createEmployment(req.body)
			.then((newObj) => {
				res.status(201).json(newObj);
			})
			.catch((err) => {
				if (err.name === 'SequelizeValidationError') {
					let message = '';
					for (let m of err.errors) {
						message += m.message + '\n';
					}
					res.status(403).json({
						message,
					});
				} else {
					if (!err.statusCode) {
						err.statusCode = 500;
					}
					res.status(403).json({
						message: `Nie udało się zaktualizować zatrudnienia`,
					});
				}
			});
	}
};

exports.updateEmployment = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const empId = req.params.empId;
		EmploymentRepository.updateEmployment(empId, req.body)
			.then((result) => {
				res.status(200).json({
					message: 'Employment updated!',
					emp: result,
				});
			})
			.catch((err) => {
				if (err.name === 'SequelizeValidationError') {
					let message = '';
					for (let m of err.errors) {
						message += m.message + '\n';
					}
					res.status(403).json({
						message,
					});
				} else {
					if (!err.statusCode) {
						err.statusCode = 500;
					}
					res.status(403).json({
						message: `Nie udało się zaktualizować zatrudnienia`,
					});
				}
			});
	}
};

exports.deleteEmployment = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const empId = req.params.empId;
		EmploymentRepository.deleteEmployment(empId)
			.then((result) => {
				res.status(200).json({
					message: 'Zatrudnienie usunięto',
					emp: result,
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				res.status(403).json({
					message: 'Nie udało się usunąć zatrudnienia!',
				});
			});
	}
};
