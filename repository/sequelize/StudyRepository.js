const University = require('../../model/sequelize/University');
const Study = require('../../model/sequelize/Study');

exports.getStudys = () => {
    return Study.findAll({
        attributes: ['IdStudy', 'FieldOfStudy', 'IdUniversity','IdMode','IdGraduateDegree'],
        include: [{
            model: University,
            as: 'studysUniversity'
        }]
    });
};

exports.createStudy = (newStudyData) => {
    return Study.create({
        Study: newStudyData.Study,
        IdUniversity: newStudyData.IdUniversity
    });
};

exports.deleteStudy = (studyId) => {
    return Study.destroy({
        where: { IdStudy: studyId }
    });
};

exports.updateStudy = (studyId, data) => {
    const study = data.Study;
    const idUniversity = data.IdUniversity;
    return Study.update(data, { where: { IdStudy: studyId } });
}

exports.getStudyById = (studId) => {
    return Study.findByPk(studId);
};