const GraduateDegree = require('../../model/sequelize/GraduateDegree');
const Study = require('../../model/sequelize/Study');


exports.getGraduateDegrees = () => {
    return GraduateDegree.findAll();
};

exports.createGraduateDegree = (newGraduateDegreeData) => {
    const {Name} =
    newGraduateDegreeData;
  return GraduateDegree.create({Name});
};

exports.deleteGraduateDegree = (graduateDegreeId) => {
    return GraduateDegree.destroy({
        where: { IdGraduateDegree: graduateDegreeId }
    });
};

exports.updateGraduateDegree = (graduateDegreeId, data) => {
    const Name = data.Name;
    return GraduateDegree.update(data, { where: { IdGraduateDegree: graduateDegreeId } });
}

exports.getGraduateDegreeById = (gradDegId) => {
    return GraduateDegree.findByPk(gradDegId,
        {
            include: [{
                model: Study,
                as: 'graduateDegreeStudys'
            }]
        });
};