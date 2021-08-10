const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Offer = sequelize.define('Offer', {
	IdOffer: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Topic: { type: Sequelize.STRING, allowNull: false },
	Link: {
		type: Sequelize.STRING, allowNull: false,
		validate: {
			isUrl: {
				require_tld: true, allow_underscores: false, allow_trailing_dot: false,
				msg: "Pole powinno zawierać zawierać prawidłowy URL"
			}
		}
	},
	Price: { type: Sequelize.DECIMAL, allowNull: false }
}, {
	timestamps: false,
	tableName: 'Offer'
});
module.exports = Offer;