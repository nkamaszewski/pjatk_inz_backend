const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Offer = sequelize.define('Offer', {
    idOffer: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Topic: { type: Sequelize.STRING, allowNull: false},
	Link: { type: Sequelize.STRING, allowNull: false},
	Price: { type: Sequelize.DECIMAL, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'Offer'
});
module.exports = Offer;