import express from "express";
import { getInsights } from "../services/insights.service.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/insights/AAPL
 */
router.get("/:symbol", async (req, res) => {
    const result = await getInsights(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
