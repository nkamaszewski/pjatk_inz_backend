const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Room = sequelize.define('Room', {
	idRoom: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: { type: Sequelize.STRING, allowNull: false },
	Area: { type: Sequelize.INTEGER, allowNull: false },
	CapacitySet2: { type: Sequelize.INTEGER, allowNull: true },
	CapacitySet1: { type: Sequelize.INTEGER, allowNull: true },
	CapacitySet2: { type: Sequelize.INTEGER, allowNull: true },
	CapacitySet3: { type: Sequelize.INTEGER, allowNull: true },
	CapacitySet4: { type: Sequelize.INTEGER, allowNull: true }
}, {
	timestamps: false,
	tableName: 'Room'
});
module.exports = Room;