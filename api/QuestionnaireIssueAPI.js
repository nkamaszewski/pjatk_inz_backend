const QuestionnaireIssueRepository = require('../repository/sequelize/QuestionnaireIssueRepository');

exports.getQuestionnaireIssues = (req, res, next) => {
    QuestionnaireIssueRepository.getQuestionnaireIssues()
        .then(questsis => {
            res.status(200).json(questsis);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getQuestionnaireIssueById = (req, res, next) => {
    const questisId = req.params.questisId;
    QuestionnaireIssueRepository.getQuestionnaireIssueById(questisId)
        .then(questis => {
            if (!questis) {
                res.status(404).json({
                    message: 'Questionnaire Issue with id: ' + questisId + ' not found'
                })
            } else {
                res.status(200).json(questis);
            }
        });
};

exports.createQuestionnaireIssue = (req, res, next) => {
    QuestionnaireIssueRepository.createQuestionnaireIssue(req.body)
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

exports.updateQuestionnaireIssue = (req, res, next) => {
    const questisId = req.params.questisId;
    QuestionnaireIssueRepository.updateQuestionnaireIssue(questisId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Questionnaire Issue updated!', questis: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteQuestionnaireIssue = (req, res, next) => {
    const questisId = req.params.questisId;
    QuestionnaireIssueRepository.deleteQuestionnaireIssue(questisId)
        .then(result => {
            res.status(200).json({ message: 'Removed Questionnaire Issue', questis: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};