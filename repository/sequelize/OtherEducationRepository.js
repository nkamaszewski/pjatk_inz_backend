const OtherEducation = require('../../model/sequelize/OtherEducation');
const Company = require('../../model/sequelize/Company');
const Education = require('../../model/sequelize/Education');

exports.getOtherEducations = () => {
  return OtherEducation.findAll({
    attributes: ['IdEducation', 'Name'],
    include: [
      {
        model: Company,
        as: 'otherEducationCompany',
      },
    ],
  });
};

exports.createOtherEducation = (newOtherEducationData) => {
  return OtherEducation.create({
    IdEducation: newOtherEducationData.IdEducation,
    Name: newOtherEducationData.Name,
    IdCompany: newOtherEducationData.IdCompany,
  });
};

exports.deleteOtherEducation = (eduId) => {
  return OtherEducation.destroy({
    where: { IdEducation: eduId },
  });
};

exports.updateOtherEducation = (eduId, data) => {
  const name = data.Name;
  const IdEducation = data.IdEducation;
  const IdCompany = data.IdCompany;

  return OtherEducation.update(data, { where: { IdEducation: eduId } });
};

exports.getOtherEducationById = (eduId) => {
  return OtherEducation.findByPk(eduId, {
    include: [
      {
        model: Education,
        as: 'otherEducationEducation',
      },
    ],
  });
};
