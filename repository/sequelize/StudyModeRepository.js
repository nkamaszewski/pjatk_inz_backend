const StudyMode = require('../../model/sequelize/StudyMode');
const Study = require('../../model/sequelize/Study');


exports.getStudyModes = () => {
    return StudyMode.findAll();
};

exports.createStudyMode = (newStudyModeData) => {
    return StudyMode.create({
        StudyMode: newStudyModeData.StudyMode
    });
};

exports.deleteStudyMode = (studyModeId) => {
    return StudyMode.destroy({
        where: { IdStudyMode: studyModeId }
    });
};

exports.updateStudyMode = (studyModeId, data) => {
    const studyMode = data.StudyMode;
    return StudyMode.update(data, { where: { IdStudyMode: studyModeId } });
}

exports.getStudyModeById = (studModId) => {
    return StudyMode.findByPk(studModId,
        {
            include: [{
                model: Study,
                as: 'studyModeStudys'
            }]
        });
};