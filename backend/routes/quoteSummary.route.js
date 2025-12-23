import express from "express";
import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "../utils/object.js";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol is required" });
        }

        const summary = await yf.quoteSummary(symbol.toUpperCase());

        if (!summary) {
            return res.status(502).json({ error: "No data returned from Yahoo Finance" });
        }

        const excludeFields = [
            "price.regularMarketOpen",
            "price.regularMarketPreviousClose",
            "defaultKeyStatistics.enterpriseValue",
            "financialData.currentPrice"
        ];

        const filteredSummary = { ...summary };

        excludeFields.forEach(path => {
            deleteByPath(filteredSummary, path);
        });

        res.json({
            symbol: symbol.toUpperCase(),
            data: filteredSummary,
            hasNulls: hasNullValues(filteredSummary)
        });
    } catch {
        res.status(500).json({ error: "Failed to fetch quote summary" });
    }
});

export default router;
