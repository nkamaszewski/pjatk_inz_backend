const TrainingRepository = require('../repository/sequelize/TrainingRepository');

exports.getTrainings = (req, res, next) => {
    TrainingRepository.getTrainings()
        .then(trns => {
            res.status(200).json(trns);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTrainingById = (req, res, next) => {
    const eduId = req.params.eduId;
    TrainingRepository.getTrainingById(eduId)
        .then(trn => {
            if (!trn) {
                res.status(404).json({
                    message: 'Training with id: ' + eduId + ' not found'
                })
            } else {
                res.status(200).json(trn);
            }
        });
};

exports.createTraining = (req, res, next) => {
    const eduId = req.params.eduId;

    TrainingRepository.createTraining(eduId, req.body)
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

exports.updateTraining = (req, res, next) => {
    const eduId = req.params.eduId;
    TrainingRepository.updateTraining(eduId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Training updated!', trn: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteTraining = (req, res, next) => {
    const eduId = req.params.eduId;
    TrainingRepository.deleteTraining(eduId)
        .then(result => {
            res.status(200).json({ message: 'Removed Training', trn: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};