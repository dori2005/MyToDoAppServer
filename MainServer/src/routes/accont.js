import express from "express";

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Handling GET Request to /account"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message : "Handling POST Request to /account"
    });
});

export default router;