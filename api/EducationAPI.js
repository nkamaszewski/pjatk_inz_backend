const EducationRepository = require('../repository/sequelize/EducationRepository');
const Role = require('../model/Role');

exports.getEducation = (req, res, next) => {
	EducationRepository.getEducation()
		.then((edus) => {
			res.status(200).json(edus);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEducationById = (req, res, next) => {
	const eduId = req.params.eduId;
	EducationRepository.getEducationById(eduId).then((edu) => {
		if (!edu) {
			res.status(404).json({
				message: 'Education with id: ' + eduId + ' not found',
			});
		} else {
			res.status(200).json(edu);
		}
	});
};

exports.createEducation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		EducationRepository.createEducation(req.body)
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
						message: `Nie udało się zaktualizować szkolenia`,
					});
				}
			});
	}
};

exports.updateEducation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const eduId = req.params.eduId;
		EducationRepository.updateEducation(eduId, req.body)
			.then((result) => {
				res
					.status(200)
					.json({ message: 'Zaktualizowano szkolenie!', edu: result });
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
};

exports.deleteEducation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const eduId = req.params.eduId;
		EducationRepository.deleteEducation(eduId)
			.then((result) => {
				res.status(200).json({ message: 'Usunięto szkolenie', edu: result });
			})
			.catch((err) => {
				if (err.name === 'SequelizeForeignKeyConstraintError') {
					res.status(403).json({
						message:
							'Nie można usunąć szkolenia, które zostało przypisane uczestnikowi',
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
