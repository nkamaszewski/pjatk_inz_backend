const TopicRepository = require('../repository/sequelize/TopicRepository');

exports.getTopics = (req, res, next) => {
    TopicRepository.getTopics()
        .then(tops => {
            res.status(200).json(tops);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTopicById = (req, res, next) => {
    const topId = req.params.topId;
    TopicRepository.getTopicById(topId)
        .then(top => {
            if (!top) {
                res.status(404).json({
                    message: 'Topic with id: ' + topId + ' not found'
                })
            } else {
                res.status(200).json(top);
            }
        });
};

exports.createTopic = (req, res, next) => {
    TopicRepository.createTopic(req.body)
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

exports.updateTopic = (req, res, next) => {
    const topId = req.params.topId;
    TopicRepository.updateTopic(topId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Topic updated!', top: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteTopic = (req, res, next) => {
    const topId = req.params.topId;
    TopicRepository.deleteTopic(topId)
        .then(result => {
            res.status(200).json({ message: 'Removed Topic', top: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};