const Position = require('../../model/sequelize/Position');
const Employment = require('../../model/sequelize/Employment');

exports.getPositions = () => {
    return Position.findAll();
};

exports.createPosition = (newPositionData) => {
    return Position.create({
        Name: newPositionData.Name
    });
};

exports.deletePosition = (positionId) => {
    return Position.destroy({
        where: { IdPosition: positionId }
    });
};

exports.updatePosition = (positionId, data) => {
    const name = data.Name;
    return Position.update(data, { where: { IdPosition: positionId } });
}

exports.getPositionById = (posId) => {
    return Position.findByPk(posId,
        {
            include: [{
                model: Employment,
                as: 'positionEmployments'
            }]
        });
};

