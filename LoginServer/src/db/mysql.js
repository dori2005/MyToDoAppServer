const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user: 'regmaster',
    password: 'reg1234',
    port: 3306,
    database:'REG_DB'
});

function postLoginTest(callback, id) {
    connection.query(`SELETE pw FROM login WHERE id = '${id}`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}
module.exports = {
    getAllTest,
    postTest,
    patchTest,
    deleteTest,
    postLoginTest,
}