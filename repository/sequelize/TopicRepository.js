const Subject = require('../../model/sequelize/Subject');
const Topic = require('../../model/sequelize/Topic');

exports.getTopics = () => {
    return Topic.findAll({
        attributes: ['IdTopic', 'Topic', 'IdSubject'],
        include: [{
            model: Subject,
            as: 'topicsSubject'
        }]
    });
};

exports.createTopic = (newTopicData) => {
    return Topic.create({
        Topic: newTopicData.Topic,
        IdSubject: newTopicData.IdSubject
    });
};

exports.deleteTopic = (topicId) => {
    return Topic.destroy({
        where: { IdTopic: topicId }
    });
};

exports.updateTopic = (topicId, data) => {
    const topic = data.Topic;
    const idSubject = data.IdSubject;
    return Topic.update(data, { where: { IdTopic: topicId } });
}

exports.getTopicById = (topId) => {
    return Topic.findByPk(topId);
};

