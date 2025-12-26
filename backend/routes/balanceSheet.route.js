import express from "express";
import { getBalanceSheet } from "../services/balanceSheet.service.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/balance-sheet/AAPL?period1=2024-01-01&period2=2025-01-01&type=quarterly
 */

router.get("/:symbol", async (req, res) => {
    const result = await getBalanceSheet(req.params.symbol, req.query);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
