const conn = require('./mysql');

const postLoginTest = async(callback, id) => {
    try {
        const [rows] = await conn.execute('SELECT pw FROM login WHERE id=?',[id]);
        callback(rows);
        connection.release();
    } catch (err) {
        console.log(err);
    }
}

const enrollToken = async(callback, id, token) => {
    try {
        const [rows] = await conn.execute('INSERT INTO cert (id) VALUES (?)',[id]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

function signUpTest(callback, id, pw) {
    conn.query(`INSERT INTO login (id, pw) VALUES ('${id}', '${pw}')`, (err, rows, fields)=> {
        if(err) throw err;
        callback(rows);
    })
}
function reSignTest(callback, id) {
    conn.query(`DELETE FROM login WHERE id = '${id}'`, (err, rows, fields)=> {
        if(err) throw err;
        callback(rows);
    })
}
module.exports = {
    postLoginTest,
    enrollToken,
    signUpTest
}