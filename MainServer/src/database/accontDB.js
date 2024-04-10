import pool from "./connection";

const getPWById = async(callback, id) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('SELECT pw FROM login WHERE id=?',[id]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

const registerAccount = async(callback, id, pw) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('INSERT INTO login (id, pw) VALUES (?, ?)',[id, pw]);
        callback(rows);
        conn.release();
    }catch(err) {
        console.log(err);
    }
}

export default {
    getPWById,
    registerAccount,
}