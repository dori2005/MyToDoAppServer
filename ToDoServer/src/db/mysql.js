const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user: 'regmaster',
    password: 'reg1234',
    database:'REG_DB',
    connectionLimit: 4,
});

function getAllTest(callback, id){
    connection.query(`SELECT * FROM todos WHERE user_id='${id}'`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

function postTest(callback, user_id, time, data) {
    connection.query(`INSERT INTO todos (user_id, time, todo_text, complete) VALUES (
        '${user_id}', '${time}', '${data["text"] }', ${data["complete"]==true?1:0})`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}
function patchTest(callback, key, text, complete) {
    if (text) {
        connection.query(`UPDATE todos SET todo_text = '${text}', complete = '${complete?1:0}' WHERE time = '${key}'`, (err, rows, fields) => { 
            callback(rows);
        });
    } else {
        connection.query(`UPDATE todos SET complete = '${complete?1:0}' WHERE time = '${key}'`, (err, rows, fields) => { 
            callback(rows);
        });
    }
}

function deleteTest(callback, key) {
    connection.query(`DELETE FROM todos WHERE time = '${key}'`, (err, rows, fields) => {
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