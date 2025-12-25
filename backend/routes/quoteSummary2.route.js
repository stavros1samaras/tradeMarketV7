import express from "express";
import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "../utils/object.js";

const router = express.Router();

// http://localhost:3001/api/quote-summary/AAPL?modules=summaryProfile,financialData
// http://localhost:3001/api/quote-summary/AAPL?modules=all

router.get("/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const { modules } = req.query;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol is required" });
        }

        let options = undefined;

        if (modules) {
            options =
                modules === "all"
                    ? { modules: "all" }
                    : { modules: modules.split(",").map(m => m.trim()) };
        }

        const summary = options
            ? await yf.quoteSummary(symbol.toUpperCase(), options)
            : await yf.quoteSummary(symbol.toUpperCase());

        if (!summary) {
            return res.status(502).json({ error: "No data returned from Yahoo Finance" });
        }

        // 🔥 HARD-CODED EXCLUDED FIELDS
        const excludeFields = [
            "price.regularMarketOpen",
            "price.regularMarketPreviousClose",
            "price.regularMarketDayHigh",
            "price.regularMarketDayLow",
            "defaultKeyStatistics.enterpriseValue",
            "financialData.currentPrice",
            "financialData.targetMeanPrice"
        ];

        const filteredSummary = { ...summary };

        excludeFields.forEach(path => {
            deleteByPath(filteredSummary, path);
        });

        res.json({
            symbol: symbol.toUpperCase(),
            modules: options?.modules ?? "default",
            data: filteredSummary,
            hasNulls: hasNullValues(filteredSummary)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch quote summary" });
    }
});

export default router;
