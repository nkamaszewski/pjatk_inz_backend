const ParticipationRepository = require('../repository/sequelize/ParticipationRepository');
const Role = require('../model/Role');
const multiparty = require('multiparty');

exports.getParticipations = (req, res, next) => {
	ParticipationRepository.getParticipations()
		.then((particips) => {
			res.status(200).json(particips);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getParticipationsByIdEducation = (req, res, next) => {
	const { idEducation } = req.params;
	ParticipationRepository.getParticipationsByIdEducation(idEducation)
		.then((particips) => {
			res.status(200).json(particips);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getParticipationById = (req, res, next) => {
	const participId = req.params.participId;
	ParticipationRepository.getParticipationById(participId).then((particip) => {
		if (!particip) {
			res.status(404).json({
				message: 'Participation with id: ' + participId + ' not found',
			});
		} else {
			res.status(200).json(particip);
		}
	});
};

exports.createParticipation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const formData = new multiparty.Form();
		formData.parse(req, (err, fields, files) => {
			const data = {
				IdEducation: fields.IdEducation[0],
				IdPerson: fields.IdPerson[0],
				DateOfRegistration: fields.DateOfRegistration[0],
				EndDate: fields.EndDate[0] ?? null,
				CertificateOfCompletion: files.CertificateOfCompletion[0],
			};

			ParticipationRepository.createParticipation(data)
				.then((newObj) => {
					res.status(201).json(newObj);
				})
				.catch((err) => {
					if (err.name === 'SequelizeUniqueConstraintError') {
						res.status(403).json({
							message: `Pracownik jest już zapisany na to szkolenie`,
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
							message: `Nie udało się dodać zapisu na szkolenie`,
						});
					}
				});
		});
	}
};

exports.updateParticipation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const participId = req.params.participId;
		ParticipationRepository.updateParticipation(participId, req.body)
			.then((result) => {
				res
					.status(200)
					.json({ message: 'Participation updated!', particip: result });
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Pracownik jest już zapisany na to szkolenie`,
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
						message: `Nie udało się zaktualizować zapisu na szkolenie`,
					});
				}
			});
	}
};

exports.deleteParticipation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const participId = req.params.participId;
		ParticipationRepository.deleteParticipation(participId)
			.then((result) => {
				res
					.status(200)
					.json({ message: 'Removed Participation', particip: result });
			})
			.catch((err) => {
				if (err.name === 'SequelizeForeignKeyConstraintError') {
					res.status(403).json({
						message:
							'Nie można usunąć zapisu na szkolenie ze względu na powiązania z innymi dokumentami',
					});
				} else {
					err.statusCode = 500;
					res.status(403).json({
						message: 'Nie udało się usunąć zapisu na szkolenie!',
					});
				}
			});
	}
};

exports.getCertificateByPartId = (req, res, next) => {
	const participId = req.params.participId;
	ParticipationRepository.getCertificateByPartId(participId).then(
		(particip) => {
			if (!particip) {
				res.status(404).json({
					message: 'Participation with id: ' + participId + ' not found',
				});
			} else {
				// const formData = new multiparty.Form();
				// formData.parse(particip, (err, fields, files) => {
				// 	const data = {
				// 		CertificateOfCompletion: files.CertificateOfCompletion[0],
				// 	};
				// 	res.status(200).json(data);
				res.status(200).json(particip);
			}
		}
	);
};
