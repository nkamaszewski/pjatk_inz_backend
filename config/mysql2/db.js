const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'pjatk_inz_root',
    password: 'root8TOOR',
    database: 'pjatk_inz_db'
});
module.exports = pool;