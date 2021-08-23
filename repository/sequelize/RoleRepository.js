const Role = require('../../model/sequelize/Role');

exports.getRoles = () => {
    return Role.findAll();
};

exports.createRole = (newRoleData) => {
    return Role.create({
        Name: newRoleData.Name
    });
};

exports.deleteRole = (roleId) => {
    return Role.destroy({
        where: { IdRole: roleId }
    });
};

exports.updateRole = (roleId, data) => {
    const name = data.Role;
    return Role.update(data, { where: { IdRole: roleId } });
}
exports.getRoleById = (roleId) => {
    return Role.findByPk(roleId);
};

