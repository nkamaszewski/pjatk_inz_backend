const RoomRepository = require('../repository/sequelize/RoomRepository');
const Role = require('../model/Role')

exports.getRooms = (req, res, next) => {
    RoomRepository.getRooms()
        .then(rooms => {
            res.status(200).json(rooms);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRoomById = (req, res, next) => {
    const roomId = req.params.roomId;
    RoomRepository.getRoomById(roomId)
        .then(room => {
            if (!room) {
                res.status(404).json({
                    message: 'Room with id: ' + roomId + ' not found'
                })
            } else {
                res.status(200).json(room);
            }
        });
};

exports.createRoom = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    RoomRepository.createRoom(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateRoom = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    const roomId = req.params.roomId;
    RoomRepository.updateRoom(roomId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Room updated!',
                room: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteRoom = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    const roomId = req.params.roomId;
    RoomRepository.deleteRoom(roomId)
        .then(result => {
            res.status(200).json({
                message: 'Removed Room',
                room: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};