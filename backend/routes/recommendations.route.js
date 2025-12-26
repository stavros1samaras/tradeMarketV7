import express from "express";
import { getRecommendations } from "../services/recommendations.service.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/recommendations/AAPL
 */
router.get("/:symbol", async (req, res) => {
    const result = await getRecommendations(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
