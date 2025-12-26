import express from "express";
import { cashFlow } from "../utils/cashFlow.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/cash-flow/GOOGL?period1=2022-01-01&period2=2025-01-01&type=quarterly
 */
router.get("/:symbol", async (req, res) => {
    const result = await cashFlow(req.params.symbol, req.query);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
