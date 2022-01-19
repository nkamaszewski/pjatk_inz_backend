const QuestionnaireOfferRepository = require('../repository/sequelize/QuestionnaireOfferRepository');
const {
	mapToQuestionnaireOfferList,
} = require('../mappers/mapToQuestionnaireOfferList');

exports.getQuestionnaireOffers = (req, res, next) => {
	const uId = req.userId;
	const uIdDepartment = req.userIdDepartment;
	const uIdDivision = req.userIdDivision;
	const uIdRole = req.userIdRole;
	QuestionnaireOfferRepository.getQuestionnaireOffers(
		uId,
		uIdDepartment,
		uIdDivision,
		uIdRole
	)
		.then((questsoff) => {
			res.status(200).json(mapToQuestionnaireOfferList(questsoff));
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getQuestionnaireOfferById = (req, res, next) => {
	const questOffId = req.params.questOffId;
	QuestionnaireOfferRepository.getQuestionnaireOfferById(questOffId).then(
		(questoff) => {
			if (!questoff) {
				res.status(404).json({
					message: 'Questionnaire Offer with id: ' + questOffId + ' not found',
				});
			} else {
				res.status(200).json(questoff);
			}
		}
	);
};

exports.createQuestionnaireOffer = (req, res, next) => {
	QuestionnaireOfferRepository.createQuestionnaireOffer(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === 'SequelizeUniqueConstraintError') {
				res.status(403).json({
					message: `Istnieje wniosek tego pracownika złożony w tym roku`,
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

exports.updateQuestionnaireOffer = (req, res, next) => {
	const questoffId = req.params.questOffId;
	QuestionnaireOfferRepository.updateQuestionnaireOffer(questoffId, req.body)
		.then((result) => {
			res
				.status(200)
				.json({ message: 'Questionnaire Offer updated!', questoff: result });
		})
		.catch((err) => {
			if (err.name === 'SequelizeUniqueConstraintError') {
				res.status(403).json({
					message: `Istnieje wniosek tego pracownika złożony w tym roku`,
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

exports.deleteQuestionnaireOffer = (req, res, next) => {
	const questoffId = req.params.questOffId;
	const userId = req.userId;

	QuestionnaireOfferRepository.deleteQuestionnaireOffer(questoffId, userId)
		.then((result) => {
			if (result == -1) {
				res.status(403).json({ message: 'Brak uprawnień!' });
			} else {
				res
					.status(200)
					.json({ message: 'Removed Questionnaire Offer', questoff: result });
			}
		})
		.catch((err) => {
			if (err.name === 'SequelizeForeignKeyConstraintError') {
				res.status(403).json({
					message: 'Nie można usunąć wniosku, który zawiera propozycje szkoleń',
				});
			} else {
				err.statusCode = 500;
				res.status(403).json({
					message: 'Nie udało się usunąć wniosku!',
				});
			}
		});
};

exports.getQuestionnaireOfferByEmpId = (req, res, next) => {
	const empId = req.params.empId;
	QuestionnaireOfferRepository.getQuestionnaireOfferByEmpId(empId).then(
		(questoff) => {
			if (!questoff) {
				res.status(404).json({
					message: 'Questionnaire Offer with IdPerson: ' + empId + ' not found',
				});
			} else {
				res.status(200).json(questoff);
			}
		}
	);
};

exports.getQuestionnaireOfferByDepId = (req, res, next) => {
	const depId = req.params.depId;
	QuestionnaireOfferRepository.getQuestionnaireOfferByDepId(depId).then(
		(questoff) => {
			if (!questoff) {
				res.status(404).json({
					message:
						'Questionnaire Offer with IdDepartment: ' + depId + ' not found',
				});
			} else {
				res.status(200).json(questoff);
			}
		}
	);
};

exports.getQuestionnaireOfferByDivId = (req, res, next) => {
	const divId = req.params.divId;
	QuestionnaireOfferRepository.getQuestionnaireOfferByDepId(divId).then(
		(questoff) => {
			if (!questoff) {
				res.status(404).json({
					message:
						'Questionnaire Offer with IdDivision: ' + divId + ' not found',
				});
			} else {
				res.status(200).json(questoff);
			}
		}
	);
};
