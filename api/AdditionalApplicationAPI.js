const ReasonForRefundRepository = require('../repository/sequelize/ReasonForRefundRepository');
const ApplicationForRepository = require('../repository/sequelize/ApplicationForRepository');
const ApplicationForRefundRepository = require('../repository/sequelize/ApplicationForRefundRepository');
const ApplicationForReasonsRepository = require('../repository/sequelize/ApplicationForReasonsRepository');

exports.createAdditionalApplication = async (req, res, next) => {
	const { IdApplicationFor, IdReasonForRefund, DateOfSubmission, IdStatus } =
		req.body;

	console.log(req.body);
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
		console.log(appForRefund);
		const appForReasons =
			await ApplicationForReasonsRepository.createApplicationForReasons({
				IdReasonForRefund,
				IdApplicationForRefund: appForRefund.IdApplicationForRefund,
				IdStatus,
			});
		res.status(201).json(appForReasons);
	} catch (err) {
		// res.status(500).json({
		// 	message: 'Wystąpił błąd przy dodawaniu wniosku (internal: appForRefund)',
		// });
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
