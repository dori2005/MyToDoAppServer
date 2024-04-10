import { pool } from "./connection";

const getAllTest = async(callback, id) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('SELECT * FROM todos WHERE user_id=?',[id]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

const postTodo = async(callback, user_id, time, data) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('INSERT INTO todos (user_id, time, todo_text, complete) VALUES (?, ?, ?, ?)',
        [user_id, time, data["text"], data["complete"]]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

const patchTodo = async(callback, key, text, complete) => {
    try {
        const conn = await pool.getConnection();
        if (text) {
            const [rows] = await conn.execute('UPDATE todos SET todo_text = ?, complete = ? WHERE time = ?',
            [text, complete, key]);
        } else {
            const [rows] = await conn.execute('UPDATE todos SET complete = ? WHERE time = ?',
            [complete, key]);
        }
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

const deleteTodo = async(callback, key) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute('DELETE FROM todos WHERE time = ?', [key]);
        callback(rows);
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

export default {
    getAllTest,
    postTodo,
    patchTodo,
    deleteTodo
}