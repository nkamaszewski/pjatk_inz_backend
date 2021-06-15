const StudyRepository = require('../repository/sequelize/StudyRepository');

exports.getStudys = (req, res, next) => {
    StudyRepository.getStudys()
        .then(studs => {
            res.status(200).json(studs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getStudyById = (req, res, next) => {
    const studId = req.params.studId;
    StudyRepository.getStudyById(studId)
        .then(stud => {
            if (!stud) {
                res.status(404).json({
                    message: 'Study with id: ' + studId + ' not found'
                })
            } else {
                res.status(200).json(stud);
            }
        });
};

exports.createStudy = (req, res, next) => {
    StudyRepository.createStudy(req.body)
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

exports.updateStudy = (req, res, next) => {
    const studId = req.params.studId;
    StudyRepository.updateStudy(studId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Study updated!', stud: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteStudy = (req, res, next) => {
    const studId = req.params.studId;
    StudyRepository.deleteStudy(studId)
        .then(result => {
            res.status(200).json({ message: 'Removed Study', stud: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};