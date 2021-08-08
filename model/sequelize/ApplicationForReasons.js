const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ApplicationForReasons = sequelize.define('ApplicationForReasons', {
    IdReasonForRefund: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
    IdApplicationForRefund: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
    IdStatus: { type: Sequelize.INTEGER, allowNull: false }
}, {
    timestamps: false,
    tableName: 'ApplicationForReasons',
    indexes: [
        {
            name: 'idx_applicationForReasons_idStuatus',
            fields: ['IdStatus']
        }
    ]
});
module.exports = ApplicationForReasons;