const OfferRepository = require("../repository/sequelize/OfferRepository");

exports.getOffers = (req, res, next) => {
	OfferRepository.getOffers()
		.then((offers) => {
			res.status(200).json(offers);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getOfferById = (req, res, next) => {
	const offerId = req.params.offerId;
	OfferRepository.getOfferById(offerId).then((offer) => {
		if (!offer) {
			res.status(404).json({
				message: "Offer with id: " + offerId + " not found",
			});
		} else {
			res.status(200).json(offer);
		}
	});
};

exports.createOffer = (req, res, next) => {
	const idQuestOffer = req.body.IdQuestionnaireOffer;

	console.log(idQuestOffer);
	OfferRepository.getNumberOfOffers(idQuestOffer)
		.then((offers) => {
			if (offers.count >= 4) {
				console.log(offers.count);
				res.status(403).json({
					message: "Można zaproponować tylko 4 szkolenia",
				});
			} else {
				OfferRepository.createOffer(req.body)
					.then((newObj) => {
						res.status(201).json(newObj);
					})
					.catch((err) => {
						if (err.name === "SequelizeValidationError") {
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
								message: `Nie udało się dodać propozycji szkolenia`,
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
				message: `Nie udało się dodać propozycji szkolenia`,
			});
		});
};

exports.updateOffer = (req, res, next) => {
	const offerId = req.params.offerId;
	const userId = req.userId;

	OfferRepository.updateOffer(offerId, userId, req.body)
		.then((result) => {
			if (result == -1) {
				res.status(403).json({ message: "Brak uprawnień!" });
			} else {
				res
					.status(200)
					.json({ message: "Wniosek zaktualizowany!", offer: result });
			}
		})
		.catch((err) => {
			if (err.name === "SequelizeValidationError") {
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
					message: `Nie udało się zaktualizować propozycji szkolenia`,
				});
			}
		});
};

exports.deleteOffer = (req, res, next) => {
	const offerId = req.params.offerId;
	const userId = req.userId;
	OfferRepository.deleteOffer(offerId, userId)
		.then((result) => {
			if (result == -1) {
				res.status(403).json({ message: "Brak uprawnień!" });
			} else {
				res
					.status(200)
					.json({ message: "Wniosek zaktualizowany!", offer: result });
			}
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
