import express from "express";
import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "../utils/object.js";

const router = express.Router();

// http://localhost:3001/api/financials/MSFT?period1=2020-01-01&period2=2025-01-01&type=annual
router.get("/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const { period1, period2, type } = req.query;

        if (!symbol) return res.status(400).json({ error: "Symbol is required" });
        if (!period1 || !period2 || !type) {
            return res.status(400).json({ error: "period1, period2 and type are required" });
        }

        const data = await yf.fundamentalsTimeSeries(symbol, {
            period1,
            period2,
            type,
            module: "financials"
        });

        if (!data) {
            return res.status(502).json({ error: "No data returned from Yahoo Finance" });
        }

        const excludeFields = [
            "deferredRevenue",
            "otherCurrentLiabilities",
            "minorityInterest",
            "goodWill"
        ];

        const filteredData = { ...data };
        excludeFields.forEach(path => deleteByPath(filteredData, path));

        res.json({
            symbol: filteredData.symbol ?? symbol.toUpperCase(),
            data: filteredData,
            hasNulls: hasNullValues(filteredData)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
