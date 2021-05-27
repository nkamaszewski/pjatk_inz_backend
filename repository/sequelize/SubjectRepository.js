const Subject = require('../../model/sequelize/Subject');
const Topic = require('../../model/sequelize/Topic');

exports.getSubjects = () => {
    return Subject.findAll();
};

exports.createSubject = (newSubjectData) => {
    return Subject.create({
        Subject: newSubjectData.Subject
    });
};

exports.deleteSubject = (subjectId) => {
    return Subject.destroy({
        where: { IdSubject: subjectId }
    });
};

exports.updateSubject = (subjectId, data) => {
    const subject = data.Subject;
    return Subject.update(data, { where: { IdSubject: subjectId } });
}

exports.getSubjectById = (subId) => {
    return Subject.findByPk(subId,
        {
            include: [{
                model: Topic,
                as: 'subjectTopics'
            }]
        });
};

