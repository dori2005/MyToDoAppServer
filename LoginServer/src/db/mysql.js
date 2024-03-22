const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : 'localhost',
    user: 'regmaster',
    password: 'reg1234',
    database:'REG_DB',
    connectionLimit: 4,
});

const postLoginTest = async(callback, id) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('SELECT pw FROM login WHERE id=?',[id]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

const deleteToken = async(callback, token) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('DELETE FROM cert WHERE token=?',[token]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

const enrollToken = async(callback, id, token) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('INSERT INTO cert (token, id) VALUES (?, ?)',[token, id]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

const getUserId = async(callback, token) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('SELECT id FROM cert WHERE token=?',[token]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

const signUpTest = async(callback, id, pw) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('INSERT INTO login (id, pw) VALUES (?, ?)',[id, pw]);
        callback(rows);
        conn.release();
    }catch(err) {
    }
}


module.exports = {
    postLoginTest,
    enrollToken,
    signUpTest,
    deleteToken,
    getUserId
}