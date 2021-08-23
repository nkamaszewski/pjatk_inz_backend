const OtherEducationRepository = require('../repository/sequelize/OtherEducationRepository');

exports.getOtherEducations = (req, res, next) => {
    OtherEducationRepository.getOtherEducations()
        .then(oEdus => {
            res.status(200).json(oEdus);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOtherEducationById = (req, res, next) => {
    const eduId = req.params.eduId;
    OtherEducationRepository.getOtherEducationById(eduId)
        .then(oEdu => {
            if (!oEdu) {
                res.status(404).json({
                    message: 'OtherEducation with id: ' + eduId + ' not found'
                })
            } else {
                res.status(200).json(oEdu);
            }
        });
};

exports.createOtherEducation = (req, res, next) => {
    OtherEducationRepository.createOtherEducation(req.body)
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

exports.updateOtherEducation = (req, res, next) => {
    const eduId = req.params.eduId;
    OtherEducationRepository.updateOtherEducation(eduId, req.body)
        .then(result => {
            res.status(200).json({ message: 'OtherEducation updated!', oEdu: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteOtherEducation = (req, res, next) => {
    const eduId = req.params.eduId;
    OtherEducationRepository.deleteOtherEducation(eduId)
        .then(result => {
            res.status(200).json({ message: 'Removed OtherEducation', oEdu: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};