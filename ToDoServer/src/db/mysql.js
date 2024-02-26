const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user: 'nodetest',
    password: 'test1234',
    port: 3306,
    database:'NODE_DB'
});

function getAllTest(callback){
    connection.query(`SELECT * FROM TODO`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

function postTest(callback, time, data) {
    connection.query(`INSERT INTO todo (time, text, work, complete) VALUES ('${time}', '${data["text"] }', ${data["working"]==true?1:0}, ${data["complete"]==true?1:0})`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}
function patchTest(callback, key, text, complete) {
    if (text) {
        connection.query(`UPDATE todo SET text = '${text}', complete = '${complete?1:0}' WHERE time = '${key}'`, (err, rows, fields) => { 
            callback(rows);
        });
    } else {
        connection.query(`UPDATE todo SET complete = '${complete?1:0}' WHERE time = '${key}'`, (err, rows, fields) => { 
            callback(rows);
        });
    }
}

function deleteTest(callback, key) {
    connection.query(`DELETE FROM todo WHERE time = '${key}'`, (err, rows, fields) => {
        callback(rows);
    });
}

function postLoginTest(callback, id, pw) {
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