const EducationRepository = require('../repository/sequelize/EducationRepository');

exports.getEducation = (req, res, next) => {
    EducationRepository.getEducation()
        .then(edus => {
            res.status(200).json(edus);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEducationById = (req, res, next) => {
    const eduId = req.params.eduId;
    EducationRepository.getEducationById(eduId)
        .then(edu => {
            if (!edu) {
                res.status(404).json({
                    message: 'Education with id: ' + eduId + ' not found'
                })
            } else {
                res.status(200).json(edu);
            }
        });
};

exports.createEducation = (req, res, next) => {
    EducationRepository.createEducation(req.body)
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

exports.updateEducation = (req, res, next) => {
    const eduId = req.params.eduId;
    EducationRepository.updateEducation(eduId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Education updated!', edu: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteEducation = (req, res, next) => {
    const eduId = req.params.eduId;
    EducationRepository.deleteEducation(eduId)
        .then(result => {
            res.status(200).json({ message: 'Removed Education', edu: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};