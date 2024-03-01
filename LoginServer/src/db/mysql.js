const mysql = require('mysql2/promise');

module.exports = await mysql.createConnection({
    host : 'localhost',
    user: 'regmaster',
    password: 'reg1234',
    database:'REG_DB'
});
