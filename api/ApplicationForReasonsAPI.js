const ApplicationForReasonsRepository = require('../repository/sequelize/ApplicationForReasonsRepository');
const Role = require('../model/Role');
const Status = require('../model/Status');

exports.getApplicationForReasons = (req, res, next) => {
	ApplicationForReasonsRepository.getApplicationForReasons()
		.then((appForReass) => {
			res.status(200).json(appForReass);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getApplicationForReasonsById = (req, res, next) => {
	const appForReasId = req.params.appForReasonsId;
	ApplicationForReasonsRepository.getApplicationForReasonsById(
		appForReasId
	).then((appForReas) => {
		if (!appForReas) {
			res.status(404).json({
				message:
					'Application for reason with id: ' + appForReasId + ' not found',
			});
		} else {
			res.status(200).json(appForReas);
		}
	});
};

exports.createApplicationForReasons = (req, res, next) => {
	ApplicationForReasonsRepository.createApplicationForReasons(req.body)
		.then((newObj) => {
			console.log(newObj);
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

exports.updateApplicationForReasons = (req, res, next) => {
	const appForReasId = req.params.appForReasonsId;
	const uIdRole = req.userIdRole;

	if (uIdRole == Role.PRACOWNIK)
		ApplicationForReasonsRepository.updateApplicationForReasonsUser(
			appForReasId,
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
		ApplicationForReasonsRepository.updateApplicationForReasonsManager(
			appForReasId,
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

	if (uIdRole == Role.ADMIN)
		ApplicationForReasonsRepository.updateApplicationForReasons(
			appForReasId,
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
};

exports.deleteApplicationForReasons = (req, res, next) => {
	const appForId = req.params.appForReasonsId;
	const userId = req.userId;

	ApplicationForReasonsRepository.getApplicationForReasonsById(appForId)
		.then((appFor) => {
			const idPerson =
				appFor.applicationForReasonsApplicationForRefund
					.applicationForRefundApplicationFor.IdPerson;
			if (idPerson != userId) {
				res
					.status(403)
					.json({ message: 'Tylko właściciel wniosku może go usunąć' });
			} else if (appFor.IdStatus == Status.ZATWIERDZONY_DYR) {
				res
					.status(403)
					.json({ message: 'Nie można usunąć zaakceptowanego wniosku' });
			} else {
				ApplicationForReasonsRepository.deleteApplicationForReasons(appForId)
					.then((result) => {
						res.status(200).json({
							message: 'Wniosek usunięty',
							appFor: result,
						});
					})
					.catch((err) => {
						if (!err.statusCode) {
							err.statusCode = 500;
						}
						res.status(403).json({
							message: `Nie udało się usunąć wniosku`,
						});
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
