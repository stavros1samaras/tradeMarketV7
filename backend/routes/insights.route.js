import express from "express";
import { insights } from "../utils/insights.js";

const router = express.Router();

//http://localhost:3001/api/insights/AAPL
router.get("/:symbol", async (req, res) => {
    const result = await insights(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
