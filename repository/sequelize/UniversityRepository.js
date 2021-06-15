const University = require('../../model/sequelize/University');
const Study = require('../../model/sequelize/Study');

exports.getUniversitys = () => {
    return University.findAll();
};

exports.createUniversity = (newUniversityData) => {
    return University.create({
        University: newUniversityData.University
    });
};

exports.deleteUniversity = (universityId) => {
    return University.destroy({
        where: { IdUniversity: universityId }
    });
};

exports.updateUniversity = (universityId, data) => {
    const university = data.University;
    return University.update(data, { where: { IdUniversity: universityId } });
}

exports.getUniversityById = (univId) => {
    return University.findByPk(univId,
        {
            include: [{
                model: Study,
                as: 'universityStudys'
            }]
        });
};
