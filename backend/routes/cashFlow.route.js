import express from "express";
import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "../utils/object.js";

const router = express.Router();

// http://localhost:3001/api/cash-flow/GOOGL?period1=2022-01-01&period2=2025-01-01&type=quarterly
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
            module: "cash-flow"
        });

        if (!data) {
            return res.status(502).json({ error: "No data returned from Yahoo Finance" });
        }

        // Στατικός πίνακας με paths που θέλουμε να αφαιρεθούν
        const excludeFields = [
            "depreciation",
            "capitalExpenditures",
            "dividendsPaid",
            "otherCashFlowItems"
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
