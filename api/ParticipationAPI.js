const ParticipationRepository = require('../repository/sequelize/ParticipationRepository');

exports.getParticipations = (req, res, next) => {
    ParticipationRepository.getParticipations()
        .then(particips => {
            res.status(200).json(particips);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getParticipationById = (req, res, next) => {
    const participId = req.params.participId;
    ParticipationRepository.getParticipationById(participId)
        .then(particip => {
            if (!particip) {
                res.status(404).json({
                    message: 'Participation with id: ' + participId + ' not found'
                })
            } else {
                res.status(200).json(particip);
            }
        });
};

exports.createParticipation = (req, res, next) => {
    ParticipationRepository.createParticipation(req.body)
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

exports.updateParticipation = (req, res, next) => {
    const participId = req.params.participId;
    ParticipationRepository.updateParticipation(participId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Participation updated!', particip: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteParticipation = (req, res, next) => {
    const participId = req.params.participId;
    ParticipationRepository.deleteParticipation(participId)
        .then(result => {
            res.status(200).json({ message: 'Removed Participation', particip: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};