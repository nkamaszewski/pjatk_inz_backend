const SubjectRepository = require('../repository/sequelize/SubjectRepository');
const Role = require('../model/Role');

exports.getSubjects = (req, res, next) => {
	SubjectRepository.getSubjects()
		.then((subs) => {
			res.status(200).json(subs);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getSubjectById = (req, res, next) => {
	const subId = req.params.subId;
	SubjectRepository.getSubjectById(subId).then((sub) => {
		if (!sub) {
			res.status(404).json({
				message: 'Subject with id: ' + subId + ' not found',
			});
		} else {
			res.status(200).json(sub);
		}
	});
};

exports.createSubject = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		SubjectRepository.createSubject(req.body)
			.then((newObj) => {
				res.status(201).json(newObj);
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje już taka tematyka`,
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
						message: `Nie udało się dodać tematyki`,
					});
				}
			});
	}
};

exports.updateSubject = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const subId = req.params.subId;
		SubjectRepository.updateSubject(subId, req.body)
			.then((result) => {
				res.status(200).json({ message: 'Subject updated!', sub: result });
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje już taka tematyka`,
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
						message: `Nie udało się dodać tematyki`,
					});
				}
			});
	}
};

exports.deleteSubject = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const subId = req.params.subId;
		SubjectRepository.deleteSubject(subId)
			.then((result) => {
				res.status(200).json({ message: 'Tematykę usunięto', sub: result });
			})
			.catch((err) => {
				if (err.name === 'SequelizeForeignKeyConstraintError') {
					res.status(403).json({
						message:
							'Nie można usunąć tematyki ze względu na przypisane tematy szkoleń',
					});
				} else {
					err.statusCode = 500;
					res.status(403).json({
						message: 'Nie udało się usunąć firmy!',
					});
				}
			});
	}
};
