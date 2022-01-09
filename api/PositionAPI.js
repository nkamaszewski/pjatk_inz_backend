const PositionRepository = require('../repository/sequelize/PositionRepository');
const Role = require('../model/Role');

exports.getPositions = (req, res, next) => {
	PositionRepository.getPositions()
		.then((poss) => {
			res.status(200).json(poss);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getPositionById = (req, res, next) => {
	const posId = req.params.posId;
	PositionRepository.getPositionById(posId).then((pos) => {
		if (!pos) {
			res.status(404).json({
				message: 'Position with id: ' + posId + ' not found',
			});
		} else {
			res.status(200).json(pos);
		}
	});
};

exports.createPosition = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		PositionRepository.createPosition(req.body)
			.then((newObj) => {
				res.status(201).json(newObj);
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje stanowisko o takiej nazwie`,
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
						message: `Nie udało się utworzyć stanowiska`,
					});
				}
			});
	}
};

exports.updatePosition = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const posId = req.params.posId;
		PositionRepository.updatePosition(posId, req.body)
			.then((result) => {
				res.status(200).json({ message: 'Position updated!', pos: result });
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje stanowisko o takiej nazwie`,
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
						message: `Nie udało się zaktualizować stanowiska`,
					});
				}
			});
	}
};

exports.deletePosition = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const posId = req.params.posId;
		PositionRepository.deletePosition(posId)
			.then((result) => {
				res.status(200).json({
					message: 'Stanowisko usunięto',
					pos: result,
				});
			})
			.catch((err) => {
				if (err.name === 'SequelizeForeignKeyConstraintError') {
					res.status(403).json({
						message:
							'Nie można usunąć stanowiska, które jest przypisane zatrudnionym',
					});
				} else {
					err.statusCode = 500;
					res.status(403).json({
						message: 'Nie udało się usunąć stanowiska!',
					});
				}
			});
	}
};
