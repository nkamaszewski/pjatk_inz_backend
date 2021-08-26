const Group = require('../../model/sequelize/Group');
const Training = require('../../model/sequelize/Training');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.getGroups = () => {
    return Group.findAll();
};

exports.createGroup = (newGroupData) => {
    return Group.create({
        Name: newGroupData.Name,
        NumberOfPerson: newGroupData.NumberOfPerson,
        IdEducation: newGroupData.IdEducation
    });
};

exports.deleteGroup = (groupId) => {
    return Group.destroy({
        where: { IdGroup: groupId }
    });
};

exports.updateGroup = (groupId, data) => {
    const name = data.Name;
    const numberOfPerson = data.numberOfPerson;
    const idEducation = data.idEducation;
    return Group.update(data, { where: { IdGroup: groupId } });
}

exports.getGroupById = (grpId) => {
    return Group.findByPk(grpId);
};

exports.getGroupsByActive = () => {
    return Group.findAll({
        include: [{
            model: Training,
            as: 'groupTraining',
            where: {
                DateTo: {
                    [Op.gte]: new Date()
                },
            }
        }]
    }


    );
};

