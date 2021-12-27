const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'pjatk_inz_root',
//     password: 'root8TOOR',
//     database: 'pjatk_inz_db'
// });
const pool = mysql.createPool({
    host: 'ulsq0qqx999wqz84.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user: 'z3cydyx3vshtdy4r',
    password: 'qr2qbxyzocejj2yn',
    database: 'j7dix0og2slovrp5'
});
module.exports = pool;