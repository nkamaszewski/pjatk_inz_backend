const StudyRepository = require('../repository/sequelize/StudyRepository');
const ApplicationFor = require('../repository/sequelize/ApplicationForRepository');
const Participation = require('../repository/sequelize/ParticipationRepository');
const Role = require('../model/Role');

exports.getStudys = (req, res, next) => {
	StudyRepository.getStudys()
		.then((studs) => {
			res.status(200).json(studs);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getStudyById = (req, res, next) => {
	const studId = req.params.studId;
	StudyRepository.getStudyById(studId).then((stud) => {
		if (!stud) {
			res.status(404).json({
				message: 'Study with id: ' + studId + ' not found',
			});
		} else {
			res.status(200).json(stud);
		}
	});
};

exports.createStudy = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		StudyRepository.createStudy(req.body)
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
						message: `Nie udało się utworzyć studiów`,
					});
				}
			});
	}
};

exports.updateStudy = async (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const studId = req.params.studId;
		const appFor = await ApplicationFor.getApplicationForByEduId(studId);
		const partic = await Participation.getParticipationByEduId(studId);

		if (appFor.count > 0 || partic.count > 0) {
			res.status(403).json({
				message:
					'Nie można modyfikować studiów, które przypisano w zaakceptowanych wnioskach lub szkoleniach',
			});
		} else {
			StudyRepository.updateStudy(studId, req.body)
				.then((result) => {
					res.status(200).json({ message: 'Study updated!', stud: result });
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
							message: `Nie udało się zaktualizować studiów`,
						});
					}
				});
		}
	}
};

exports.deleteStudy = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const studId = req.params.studId;
		StudyRepository.deleteStudy(studId)
			.then((result) => {
				res.status(200).json({ message: 'Removed Study', stud: result });
			})
			.catch((err) => {
				if (err.name === 'SequelizeForeignKeyConstraintError') {
					res.status(403).json({
						message:
							'Nie można usunąć studiów, które zostały przypisane uczestnikowi',
					});
				} else {
					err.statusCode = 500;
					res.status(403).json({
						message: 'Nie udało się usunąć studiów!',
					});
				}
			});
	}
};
