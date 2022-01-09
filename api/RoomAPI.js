const RoomRepository = require('../repository/sequelize/RoomRepository');
const Role = require('../model/Role');

exports.getRooms = (req, res, next) => {
	RoomRepository.getRooms()
		.then((rooms) => {
			res.status(200).json(rooms);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getRoomById = (req, res, next) => {
	const roomId = req.params.roomId;
	RoomRepository.getRoomById(roomId).then((room) => {
		if (!room) {
			res.status(404).json({
				message: 'Room with id: ' + roomId + ' not found',
			});
		} else {
			res.status(200).json(room);
		}
	});
};

exports.createRoom = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		RoomRepository.createRoom(req.body)
			.then((newObj) => {
				res.status(201).json(newObj);
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje sala o takiej nazwie`,
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
						message: `Nie udało się zaktualizować sali`,
					});
				}
			});
	}
};

exports.updateRoom = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const roomId = req.params.roomId;
		RoomRepository.updateRoom(roomId, req.body)
			.then((result) => {
				res.status(200).json({
					message: 'Room updated!',
					room: result,
				});
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje sala o takiej nazwie`,
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
						message: `Nie udało się zaktualizować sali`,
					});
				}
			});
	}
};

exports.deleteRoom = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const roomId = req.params.roomId;
		RoomRepository.deleteRoom(roomId)
			.then((result) => {
				res.status(200).json({
					message: 'Salę usunięto',
					room: result,
				});
			})
			.catch((err) => {
				if (err.name === 'SequelizeForeignKeyConstraintError') {
					res.status(403).json({
						message: 'Nie można usunąć sali ze względu na przypisane spotkania',
					});
				} else {
					err.statusCode = 500;
					res.status(403).json({
						message: 'Nie udało się usunąć sali!',
					});
				}
			});
	}
};
