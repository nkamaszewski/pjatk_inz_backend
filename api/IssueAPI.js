const IssueRepository = require('../repository/sequelize/IssueRepository');

exports.getIssues = (req, res, next) => {
    IssueRepository.getIssues()
        .then(issues => {
            res.status(200).json(issues);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getIssueById = (req, res, next) => {
    const issueId = req.params.issueId;
    IssueRepository.getQuestionnaireById(issueId)
        .then(issue => {
            if (!issue) {
                res.status(404).json({
                    message: 'Issue with id: ' + issueId + ' not found'
                })
            } else {
                res.status(200).json(issue);
            }
        });
};

exports.createIssue = (req, res, next) => {
    IssueRepository.createIssue(req.body)
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

exports.updateIssue = (req, res, next) => {
    const issueId = req.params.issueId;
    IssueRepository.updateIssue(issueId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Issue updated!', issue: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteIssue = (req, res, next) => {
    const issueId = req.params.issueId;
    IssueRepository.deleteIssue(issueId)
        .then(result => {
            res.status(200).json({ message: 'Removed Issue', issue: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};