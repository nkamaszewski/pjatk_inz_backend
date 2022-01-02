const ApplicationForRefundRepository = require("../repository/sequelize/ApplicationForRefundRepository");

exports.getApplicationForRefunds = (req, res, next) => {
	const params = req.query;

	ApplicationForRefundRepository.getApplicationForRefunds(params)
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
					"Application for refund with id: " +
					appForRefundId +
					" not found",
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
			if (err.name === "SequelizeValidationError") {
				res.status(403).json({ message: err.errors[0].message });
			} else if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
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
				message: "Zaktualizowano wniosek dodatkowy!",
				appForRef: result,
			});
		})
		.catch((err) => {
			if (err.name === "SequelizeValidationError") {
				res.status(403).json({ message: err.errors[0].message });
			} else if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteApplicationForRefund = (req, res, next) => {
	const appForRefundId = req.params.appForRefundId;
	ApplicationForRefundRepository.deleteApplicationForRefund(appForRefundId)
		.then((result) => {
			res.status(200).json({
				message: "Usunięto wniosek dodatkowy",
				appForRefundId: result,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
