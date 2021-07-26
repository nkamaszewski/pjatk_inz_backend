const GraduateDegree = require('../../model/sequelize/GraduateDegree');
const Study = require('../../model/sequelize/Study');


exports.getGraduateDegrees = () => {
    return GraduateDegree.findAll();
};

exports.createGraduateDegree = (newGraduateDegreeData) => {
    return GraduateDegree.create({
        GraduateDegree: newGraduateDegreeData.GraduateDegree
    });
};

exports.deleteGraduateDegree = (graduateDegreeId) => {
    return GraduateDegree.destroy({
        where: { IdGraduateDegree: graduateDegreeId }
    });
};

exports.updateGraduateDegree = (graduateDegreeId, data) => {
    const graduateDegree = data.GraduateDegree;
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