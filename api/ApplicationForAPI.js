const ApplicationForRepository = require('../repository/sequelize/ApplicationForRepository');
const ApplicationForRepositoryMySql2 = require('../repository/mysql2/ApplicationForRepository');
const StudyRepository = require('../repository/sequelize/StudyRepository');
const TrainingRepository = require('../repository/sequelize/TrainingRepository');
const Role = require('../model/Role');
const Status = require('../model/Status');

exports.getApplicationFor = (req, res, next) => {
	const params = req.query;
	const uId = req.userId;
	const uIdDepartment = req.userIdDepartment;
	const uIdDivision = req.userIdDivision;
	const uIdRole = req.userIdRole;

	ApplicationForRepository.getApplicationFor(
		params,
		uId,
		uIdDepartment,
		uIdDivision,
		uIdRole
	)
		.then((appFor) => {
			res.status(200).json(appFor);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getApplicationForMySql2 = (req, res, next) => {
	const params = req.query;
	const uId = req.userId;
	const uIdDepartment = req.userIdDepartment;
	const uIdDivision = req.userIdDivision;
	const uIdRole = req.userIdRole;

	ApplicationForRepositoryMySql2.getApplicationFor(
		params,
		uId,
		uIdDepartment,
		uIdDivision,
		uIdRole
	)
		.then((appFor) => {
			res.status(200).json(appFor);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getApplicationForById = (req, res, next) => {
	const appForId = req.params.appForId;
	ApplicationForRepository.getApplicationForById(appForId).then((appFor) => {
		if (!appFor) {
			res.status(404).json({
				message: 'Application for with id: ' + appForId + ' not found',
			});
		} else {
			const response = { ...appFor.dataValues, EducationType: 'other' };
			StudyRepository.getStudyById(appFor.IdEducation).then((study) => {
				if (study) {
					response.EducationType = 'study';
					res.status(200).json(response);
				}

				TrainingRepository.getTrainingById(appFor.IdEducation).then(
					(training) => {
						if (training) {
							response.EducationType = 'training';
						}

						res.status(200).json(response);
					}
				);
			});
		}
	});
};

exports.createApplicationFor = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		req.body.IdStatus = Status.ZLOZONY;
	}

	req.body.IdPerson = req.userId;

	ApplicationForRepository.createApplicationFor(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === 'SequelizeUniqueConstraintError') {
				res.status(403).json({
					message: 'Użytkownik już złożył wniosek na to szkolenie',
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
					message: `Nie udało się utworzyć wniosku`,
				});
			}
		});
};

exports.updateApplicationFor = (req, res, next) => {
	const appForId = req.params.appForId;

	const uId = req.userId;
	const uIdDepartment = req.userId;
	const uIdDivision = req.userIdDivision;
	const uIdRole = req.userIdRole;

	if (uIdRole == Role.PRACOWNIK)
		ApplicationForRepository.updateApplicationForUser(
			appForId,
			uId,
			uIdRole,
			req.body
		)
			.then((result) => {
				if (result == -1) {
					res.status(403).json({
						message: 'Brak uprawnień do zmiany!',
					});
				} else {
					res.status(200).json({
						message: 'Wniosek zaktualizowany',
						appFor: result,
					});
				}
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: 'Użytkownik już złożył wniosek o to szkolenie',
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
						message: `Nie udało się zaktualizować wniosku`,
					});
				}
			});

	if (
		uIdRole == Role.KIEROWNIK &&
		req.body.IdStatus == Status.ZATWIERDZONY_DYR
	) {
		req.body.IdStatus = Status.ZATWIERDZONY_KIER;
	}
	if (uIdRole == Role.KIEROWNIK || uIdRole == Role.DYREKTOR)
		ApplicationForRepository.updateApplicationForManager(
			appForId,
			uId,
			uIdRole,
			req.body
		)
			.then((result) => {
				if (result == -1) {
					res.status(403).json({ message: 'Brak uprawnień do zmiany!' });
				} else {
					res.status(200).json({
						message: 'Status wniosku zaktualizowany',
						appFor: result,
					});
				}
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: 'Użytkownik już złożył wniosek o to szkolenie',
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
						message: `Nie udało się zaktualizować wniosku`,
					});
				}
			});

	if (uIdRole == Role.ADMIN)
		ApplicationForRepository.updateApplicationFor(
			appForId,
			uId,
			uIdRole,
			req.body
		)
			.then((result) => {
				if (result == -1) {
					res.status(403).json({ message: 'Brak uprawnień!' });
				} else {
					res.status(200).json({
						message: 'Wniosek zaktualizowany',
						appFor: result,
					});
				}
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: 'Użytkownik już złożył wniosek o to szkolenie',
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
						message: `Nie udało się zaktualizować wniosku`,
					});
				}
			});
};

exports.deleteApplicationFor = (req, res, next) => {
	const appForId = req.params.appForId;
	const userId = req.userId;

	ApplicationForRepository.getApplicationForById(appForId)
		.then((appFor) => {
			console.log(appFor);
			if (appFor.IdPerson != userId) {
				res
					.status(403)
					.json({ message: 'Tylko właściciel wniosku może go usunąć' });
			} else if (appFor.IdStatus == Status.ZATWIERDZONY_DYR) {
				res
					.status(403)
					.json({ message: 'Nie można usunąć zaakceptowanego wniosku' });
			} else {
				ApplicationForRepository.deleteApplicationFor(appForId, userId)
					.then((result) => {
						res.status(200).json({
							message: 'Wniosek usunięty',
							appFor: result,
						});
					})
					.catch((err) => {
						if (err.name === 'SequelizeForeignKeyConstraintError') {
							res.status(403).json({
								message:
									'Nie można usunąć wniosku ze względu na przypisane szkolenia',
							});
						} else {
							if (!err.statusCode) {
								err.statusCode = 500;
							}
							res.status(403).json({
								message: `Nie udało się usunąć wniosku`,
							});
						}
					});
			}
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			res.status(403).json({
				message: `Nie udało się usunąć wniosku`,
			});
		});
};

exports.getApplicationForByDepId = (req, res, next) => {
	const depId = req.params.depId;
	ApplicationForRepository.getApplicationForByDepId(depId).then((appFor) => {
		if (!appFor) {
			res.status(404).json({
				message: 'Applications with IdDepartment: ' + depId + ' not found',
			});
		} else {
			res.status(200).json(appFor);
		}
	});
};

exports.getApplicationForDivId = (req, res, next) => {
	const divId = req.params.divId;
	ApplicationForRepository.getApplicationForByDepId(divId).then((appFor) => {
		if (!appFor) {
			res.status(404).json({
				message: 'Applications with IdDivision: ' + divId + ' not found',
			});
		} else {
			res.status(200).json(appFor);
		}
	});
};

exports.getApplicationForStatId = (req, res, next) => {
	const statId = req.params.statId;
	ApplicationForRepository.getApplicationForByStatId(statId).then((appFor) => {
		if (!appFor) {
			res.status(404).json({
				message: 'Applications with IdStatus: ' + statId + ' not found',
			});
		} else {
			res.status(200).json(appFor);
		}
	});
};
