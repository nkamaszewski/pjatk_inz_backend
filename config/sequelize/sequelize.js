const Sequelize = require('sequelize');
const sequelize = new Sequelize('pjatk_inz_db', 'pjatk_inz_root', 'root8TOOR', {
dialect: 'mysql',
host: 'localhost'
});
module.exports = sequelize;