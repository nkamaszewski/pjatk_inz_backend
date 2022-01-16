const CompanyRepository = require('../repository/sequelize/CompanyRepository');
const Role = require('../model/Role');

exports.getCompanys = (req, res, next) => {
	CompanyRepository.getCompanys()
		.then((coms) => {
			res.status(200).json(coms);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCompanyOwner = (req, res, next) => {
	CompanyRepository.getCompanyOwner()
		.then((coms) => {
			res.status(200).json(coms);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCompanyById = (req, res, next) => {
	const comId = req.params.comId;
	CompanyRepository.getCompanyById(comId).then((com) => {
		if (!com) {
			res.status(404).json({
				message: 'Company with id: ' + comId + ' not found',
			});
		} else {
			res.status(200).json(com);
		}
	});
};

exports.createCompany = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		CompanyRepository.createCompany(req.body)
			.then((newObj) => {
				res.status(201).json(newObj);
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje firma o takim NIP`,
					});
				} else if (err.name === 'SequelizeValidationError') {
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
						message: `Nie udało się utworzyć firmy`,
					});
				}
			});
	}
};

exports.updateCompany = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const comId = req.params.comId;
		CompanyRepository.updateCompany(comId, req.body)
			.then((result) => {
				res.status(200).json({
					message: 'Firma zaktualizowana!',
					com: result,
				});
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje firma o takim NIP`,
					});
				} else if (err.name === 'SequelizeValidationError') {
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
						message: `Nie udało się zaktualizować firmy`,
					});
				}
			});
	}
};

exports.deleteCompany = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const comId = req.params.comId;
		CompanyRepository.getCompanyById(comId)
			.then((company) => {
				if (company.Owner == 1) {
					res.status(403).json({
						message: 'Nie można usunąć firmy - właściciela',
					});
				} else {
					CompanyRepository.deleteCompany(comId)
						.then((result) => {
							res.status(200).json({ message: 'Usunięto firmę', com: result });
						})
						.catch((err) => {
							if (err.name === 'SequelizeForeignKeyConstraintError') {
								res.status(403).json({
									message:
										'Nie można usunąć firmy ze względu na przypisane szkolenia',
								});
							} else {
								err.statusCode = 500;
								res.status(403).json({
									message: 'Nie udało się usunąć firmy!',
								});
							}
						});
				}
			})
			.catch((err) => {
				err.statusCode = 500;
				res.status(403).json({
					message: 'Nie udało się usunąć firmy!',
				});
			});
	}
};
