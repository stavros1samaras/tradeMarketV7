import express from "express";
import { financials } from "../utils/financials.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/financials/AAPL?period1=2020-01-01&period2=2025-01-01&type=annual
 */
router.get("/:symbol", async (req, res) => {
    const result = await financials(req.params.symbol, req.query);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
