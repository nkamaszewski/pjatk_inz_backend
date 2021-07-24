
const Education = require('../../model/sequelize/Education');

exports.getEducation = () => {
    return Education.findAll();
};

exports.createEducation = (newEducationData) => {
    return Education.create({
        Price: newEducationData.Price,
        PriceAccommodation: newEducationData.PriceAccommodation,
        PriceTransit: newEducationData.PriceTransit
    });
};

exports.deleteEducation = (educationId) => {
    return Education.destroy({
        where: { IdEducation: educationId }
    });
};

exports.updateEducation = (educationId, data) => {
    const price = data.Price;
    const priceAccommodation = data.PriceAccommodation;
    const priceTransit = data.PriceTransit;

    return Education.update(data, { where: { IdEducation: educationId } });
}

exports.getEducationById = (eduId) => {
    return Education.findByPk(eduId);
};

