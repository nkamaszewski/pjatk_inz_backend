const OtherEducationRepository = require('../repository/sequelize/OtherEducationRepository');
const Role = require('../model/Role');

exports.getOtherEducations = (req, res, next) => {
	OtherEducationRepository.getOtherEducations()
		.then((oEdus) => {
			res.status(200).json(oEdus);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getOtherEducationById = (req, res, next) => {
	const eduId = req.params.eduId;
	OtherEducationRepository.getOtherEducationById(eduId).then((oEdu) => {
		if (!oEdu) {
			res.status(404).json({
				message: 'OtherEducation with id: ' + eduId + ' not found',
			});
		} else {
			res.status(200).json(oEdu);
		}
	});
};

exports.createOtherEducation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		OtherEducationRepository.createOtherEducation(req.body)
			.then((newObj) => {
				res.status(201).json(newObj);
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje szkolenie o takiej nazwie tego organizatora`,
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
						message: `Nie udało się dodać szkolenia`,
					});
				}
			});
	}
};

exports.updateOtherEducation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const eduId = req.params.eduId;
		OtherEducationRepository.updateOtherEducation(eduId, req.body)
			.then((result) => {
				res.status(200).json({
					message: 'Szkolenie zaktualizowano!',
					oEdu: result,
				});
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje szkolenie o takiej nazwie tego organizatora`,
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
						message: `Nie udało się zaktualizować szkolenia`,
					});
				}
			});
	}
};

exports.deleteOtherEducation = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const eduId = req.params.eduId;
		OtherEducationRepository.deleteOtherEducation(eduId)
			.then((result) => {
				res.status(200).json({
					message: 'Usunięto szkolenie',
					oEdu: result,
				});
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
