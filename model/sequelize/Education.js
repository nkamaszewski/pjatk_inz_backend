const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Education = sequelize.define('Education', {
    IdEducation: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    Price: { type: Sequelize.DECIMAL, allowNull: false },
    PriceAccommodation: { type: Sequelize.DECIMAL, allowNull: false },
    PriceTransit: { type: Sequelize.DECIMAL, allowNull: false }
}, {
    timestamps: false,
    tableName: 'Education'
});
module.exports = Education;