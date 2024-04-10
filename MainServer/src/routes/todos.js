import express from "express";
import client from "../cacheDB.js"
import todosDB from "../database/todosDB.js";

const router = express.Router();

router.get('/:id', async(req, res, next) => {
    const id = await client.get(req.query.token);
    if (id == null) {
        return res.status(401).json({
            message : "Unauthorized."
        })
    }
    
    todosDB.getAllTest((rows) => {
        res.status(200).json(rows);
    }, id)

    res.status(200).json({
        message : "Handling GET Request to /todos"
    });
});

router.post('/:id', (req, res, next) => {
    res.status(200).json({
        message : "Handling POST Request to /todos"
    });
});

export default router;