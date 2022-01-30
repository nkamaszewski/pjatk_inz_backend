const ApplicationForRefundRepository = require('../repository/sequelize/ApplicationForRefundRepository');
const Role = require('../model/Role');
const Status = require('../model/Status');

exports.getApplicationForRefunds = (req, res, next) => {
	const params = req.query;
	const uId = req.userId;
	const uIdDepartment = req.userIdDepartment;
	const uIdDivision = req.userIdDivision;
	const uIdRole = req.userIdRole;

	ApplicationForRefundRepository.getApplicationForRefunds(
		params,
		uId,
		uIdDepartment,
		uIdDivision,
		uIdRole
	)
		.then((appForRefs) => {
			res.status(200).json(appForRefs);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getApplicationForRefundById = (req, res, next) => {
	const appForRefundId = req.params.appForRefundId;
	ApplicationForRefundRepository.getApplicationForRefundById(
		appForRefundId
	).then((appForRef) => {
		if (!appForRef) {
			res.status(404).json({
				message:
					'Application for refund with id: ' + appForRefundId + ' not found',
			});
		} else {
			res.status(200).json(appForRef);
		}
	});
};

exports.createApplicationForRefund = (req, res, next) => {
	ApplicationForRefundRepository.createApplicationForRefund(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === 'SequelizeUniqueConstraintError') {
				res.status(403).json({
					message: `Istnieje wniosek dodatkowy do wybranego wniosku o szkolenie`,
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

exports.updateApplicationForRefund = (req, res, next) => {
	const appForRefundId = req.params.appForRefundId;
	ApplicationForRefundRepository.updateApplicationForRefund(
		appForRefundId,
		req.body
	)
		.then((result) => {
			res.status(200).json({
				message: 'Zaktualizowano wniosek dodatkowy!',
				appForRef: result,
			});
		})
		.catch((err) => {
			if (err.name === 'SequelizeUniqueConstraintError') {
				res.status(403).json({
					message: `Istnieje wniosek dodatkowy do wybranego wniosku o szkolenie`,
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

exports.deleteApplicationForRefund = (req, res, next) => {
	const appForRefundId = req.params.appForRefundId;
	const userId = req.userId;

	ApplicationForRefundRepository.getApplicationForRefundById(appForRefundId)
		.then((appFor) => {
			const idPerson = appFor.applicationForRefundApplicationFor.IdPerson;
			const appForReasons = appFor.applicationForRefundApplicationForReasons;
			let status;
			for (const app of appForReasons) {
				if (app.IdStatus == Status.ZATWIERDZONY_DYR)
					status = Status.ZATWIERDZONY_DYR;
			}
			if (idPerson != userId) {
				res
					.status(403)
					.json({ message: 'Tylko właściciel wniosku może go usunąć' });
			} else if (status == Status.ZATWIERDZONY_DYR) {
				res
					.status(403)
					.json({ message: 'Nie można usunąć zaakceptowanego wniosku' });
			} else {
				ApplicationForRefundRepository.deleteApplicationForRefund(
					appForRefundId
				)
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
