const PositionRepository = require('../repository/sequelize/PositionRepository');
const Role = require('../model/Role')

exports.getPositions = (req, res, next) => {
    PositionRepository.getPositions()
        .then(poss => {
            res.status(200).json(poss);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getPositionById = (req, res, next) => {
    const posId = req.params.posId;
    PositionRepository.getPositionById(posId)
        .then(pos => {
            if (!pos) {
                res.status(404).json({
                    message: 'Position with id: ' + posId + ' not found'
                })
            } else {
                res.status(200).json(pos);
            }
        });
};

exports.createPosition = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    PositionRepository.createPosition(req.body)
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

exports.updatePosition = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    const posId = req.params.posId;
    PositionRepository.updatePosition(posId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Position updated!', pos: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePosition = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    const posId = req.params.posId;
    PositionRepository.deletePosition(posId)
        .then(result => {
            res.status(200).json({ message: 'Removed Position', pos: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};