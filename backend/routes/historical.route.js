import express from "express";
import yf from "../services/yahoo.js";
import { hasNullValues } from "../utils/object.js";

const router = express.Router();

// http://localhost:3001/api/historical/AAPL?period1=2023-01-01&period2=2024-01-01
router.get("/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const { period1, period2 } = req.query;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol is required" });
        }

        if (!period1 || !period2) {
            return res.status(400).json({ error: "period1 and period2 are required" });
        }

        const history = await yf.historical(symbol, {
            period1,
            period2
        });

        if (!history || history.length === 0) {
            return res.status(502).json({ error: "No historical data returned from Yahoo Finance" });
        }

        res.json({
            symbol: symbol.toUpperCase(),
            count: history.length,
            data: history,
            hasNulls: hasNullValues(history)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
