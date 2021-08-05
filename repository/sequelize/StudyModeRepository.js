const StudyMode = require('../../model/sequelize/StudyMode');
const Study = require('../../model/sequelize/Study');


exports.getStudyModes = () => {
    return StudyMode.findAll();
};

exports.createStudyMode = (newStudyModeData) => {
    const {Name} =
    newStudyModeData;
  return StudyMode.create({Name});
};

exports.deleteStudyMode = (studyModeId) => {
    return StudyMode.destroy({
        where: { IdStudyMode: studyModeId }
    });
};

exports.updateStudyMode = (studyModeId, data) => {
    const Name = data.Name;
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