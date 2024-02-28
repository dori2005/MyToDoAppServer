const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user: 'regmaster',
    password: 'reg1234',
    port: 3306,
    database:'REG_DB'
});

function postLoginTest(callback, id) {
    connection.query(`SELECT pw FROM login WHERE id='${id}'`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

function enrollCertification(callback, id, cert) {
    connection.query(`INSERT INTO cert (id) VALUES ('${cert}')`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

function signUpTest(callback, id, pw) {
    connection.query(`INSERT INTO login (id, pw) VALUES ('${id}', '${pw}')`, (err, rows, fields)=> {
        if(err) throw err;
        callback(rows);
    })
}
function reSignTest(callback, id) {
    connection.query(`DELETE FROM login WHERE id = '${id}'`, (err, rows, fields)=> {
        if(err) throw err;
        callback(rows);
    })
}
module.exports = {
    postLoginTest,
    enrollCertification,
    signUpTest
}