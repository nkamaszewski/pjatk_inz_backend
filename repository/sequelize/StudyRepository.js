const University = require('../../model/sequelize/University');
const Study = require('../../model/sequelize/Study');

exports.getStudys = () => {
  return Study.findAll({
    attributes: [
      'IdEducation',
      'FieldOfStudy',
      'IdUniversity',
      'IdStudyMode',
      'IdGraduateDegree',
    ],
    // include: [
    //   {
    //     model: University,
    //     as: 'studysUniversity',
    //   },
    // ],
  });
};

exports.createStudy = (newStudyData) => {
  return Study.create(newStudyData);
};

exports.deleteStudy = (studyId) => {
  return Study.destroy({
    where: { IdStudy: studyId },
  });
};

exports.updateStudy = (studyId, data) => {
  const FieldOfStudy = data.FieldOfStudy;
  return Study.update(data, { where: { IdStudy: studyId } });
};

exports.getStudyById = (studId) => {
  return Study.findByPk(studId);
};
