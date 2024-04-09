import express from "express";
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Handling GET Request to /todos"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message : "Handling POST Request to /todos"
    });
});

export default router;