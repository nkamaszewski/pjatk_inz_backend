const Division = require('../../model/sequelize/Division');
const Department = require('../../model/sequelize/Department');

exports.getDivisiony = () => {
    return Division.findAll();
};

exports.createDivision = (newDivisionData) => {
    return Division.create({
        Name: newDivisionData.Name
    });
};

exports.deleteDivision = (divisionId) => {
    return Division.destroy({
        where: { _id: divisionId }
    });
};