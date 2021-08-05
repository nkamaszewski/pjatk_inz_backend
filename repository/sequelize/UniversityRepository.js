const University = require('../../model/sequelize/University');
const Study = require('../../model/sequelize/Study');

exports.getUniversitys = () => {
  return University.findAll();
};

exports.createUniversity = (newUniversityData) => {
  const { Name, ShortName, City, PostalCode, Street, Number } =
    newUniversityData;
  return University.create({
    Name,
    ShortName,
    City,
    PostalCode,
    Street,
    Number,
  });
};

exports.deleteUniversity = (universityId) => {
  return University.destroy({
    where: { IdUniversity: universityId },
  });
};

exports.updateUniversity = (universityId, data) => {
  const university = data.University;
  return University.update(data, { where: { IdUniversity: universityId } });
};

exports.getUniversityById = (univId) => {
  return University.findByPk(univId, {
    include: [
      {
        model: Study,
        as: 'universityStudys',
      },
    ],
  });
};
