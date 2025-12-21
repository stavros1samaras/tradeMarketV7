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

        const insights = await yf.insights(symbol.toUpperCase());

        if (!insights) {
            return res.status(502).json({ error: "No data returned from Yahoo Finance" });
        }

        const excludeFields = [
            "recommendation.score",
            "instrumentInfo",
            "companySnapshot1.sectorInfo"
        ];

        const filteredInsights = { ...insights };

        excludeFields.forEach(path => {
            deleteByPath(filteredInsights, path);
        });

        res.json({
            symbol: filteredInsights.symbol ?? symbol.toUpperCase(),
            data: filteredInsights,
            hasNulls: hasNullValues(filteredInsights)
        });
    } catch {
        res.status(500).json({ error: "Failed to fetch insights" });
    }
});

export default router;
