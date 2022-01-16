const TrainingRepository = require('../repository/sequelize/TrainingRepository');
const ApplicationFor = require('../repository/sequelize/ApplicationForRepository');
const Participation = require('../repository/sequelize/ParticipationRepository');
const Role = require('../model/Role');

exports.getTrainings = (req, res, next) => {
	const params = req.query;

	TrainingRepository.getTrainings(params)
		.then((trns) => {
			res.status(200).json(trns);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getTrainingById = (req, res, next) => {
	const eduId = req.params.eduId;
	TrainingRepository.getTrainingById(eduId).then((trn) => {
		if (!trn) {
			res.status(404).json({
				message: 'Training with id: ' + eduId + ' not found',
			});
		} else {
			res.status(200).json(trn);
		}
	});
};

exports.createTraining = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		TrainingRepository.createTraining(req.body)
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
						message: `Nie udało się utworzyć szkolenia`,
					});
				}
			});
	}
};

exports.updateTraining = async (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const eduId = req.params.eduId;
		const appFor = await ApplicationFor.getApplicationForByEduId(eduId);
		const partic = await Participation.getParticipationByEduId(eduId);

		if (appFor.count > 0 || partic.count > 0) {
			res.status(403).json({
				message:
					'Nie można modyfikować szkolenia, które przypisano w zaakceptowanych wnioskach lub szkoleniach',
			});
		} else {
			TrainingRepository.updateTraining(eduId, req.body)
				.then((result) => {
					res.status(200).json({
						message: 'Szkolenie zaktualizowane!',
						trn: result,
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
							message: `Nie udało się zaktualizować szkolenia`,
						});
					}
				});
		}
	}
};

exports.deleteTraining = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const eduId = req.params.eduId;
		TrainingRepository.deleteTraining(eduId)
			.then((result) => {
				res.status(200).json({
					message: 'Usunięto szkolenie',
					trn: result,
				});
			})
			.catch((err) => {
				if (err.name === 'SequelizeForeignKeyConstraintError') {
					let msg = 'Nie można usunąć szkolenia';
					if (err.table == 'training') {
						msg = `${msg}, które posiada przypisane grupy`;
					} else if (err.table == 'education') {
						msg = `${msg}, które posiada przypisanych uczestników lub wnioski`;
					}
					res.status(403).json({
						message: msg,
					});
				} else {
					err.statusCode = 500;
					res.status(403).json({
						message: 'Nie udało się usunąć szkolenia!',
					});
				}
			});
	}
};

exports.getTrainingByInternal = (req, res, next) => {
	const int = req.params.int;
	TrainingRepository.getTrainingByInternal(int).then((trn) => {
		if (!trn) {
			res.status(404).json({
				message: 'Training with Internal: ' + int + ' not found',
			});
		} else {
			res.status(200).json(trn);
		}
	});
};
