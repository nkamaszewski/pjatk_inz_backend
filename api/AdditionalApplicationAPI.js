const ReasonForRefundRepository = require('../repository/sequelize/ReasonForRefundRepository');
const ApplicationForRepository = require('../repository/sequelize/ApplicationForRepository');
const ApplicationForRefundRepository = require('../repository/sequelize/ApplicationForRefundRepository');
const ApplicationForReasonsRepository = require('../repository/sequelize/ApplicationForReasonsRepository');
const Role = require('../model/Role');
const Status = require('../model/Status');

exports.createAdditionalApplication = async (req, res, next) => {
	const { IdApplicationFor, IdReasonForRefund, DateOfSubmission } = req.body;

	let IdStatus = req.body.IdStatus;
	let appFor = null;
	let appForRefund = null;

	try {
		appFor = await ApplicationForRepository.getApplicationForById(
			IdApplicationFor
		);
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Wybrany wniosek szkoleniowy nie istnieje w bazie danych',
		});
	}

	try {
		const appForInDB =
			await ApplicationForRefundRepository.getApplicationForRefundByAppForId(
				IdApplicationFor
			);

		if (appForInDB[0]) {
			appForRefund = appForInDB[0];
		} else {
			appForRefund =
				await ApplicationForRefundRepository.createApplicationForRefund({
					IdApplicationFor,
					IdStatus: appFor.IdStatus,
					DateOfSubmission,
				});
		}

		const userIdRole = req.userIdRole;

		if (userIdRole != Role.ADMIN) {
			IdStatus = Status.ZLOZONY;
		}

		const appForReasons =
			await ApplicationForReasonsRepository.createApplicationForReasons({
				IdReasonForRefund,
				IdApplicationForRefund: appForRefund.IdApplicationForRefund,
				IdStatus,
			});
		res.status(201).json(appForReasons);
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(403).json({
				message: 'Użytkownik już złożył taki wniosek',
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
	}
};
