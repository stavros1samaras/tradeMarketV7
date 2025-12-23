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

        const recommendations = await yf.recommendationsBySymbol(
            symbol.toUpperCase()
        );

        if (!recommendations) {
            return res.status(502).json({
                error: "No data returned from Yahoo Finance"
            });
        }

        const excludeFields = [
            "meta",
            "finance"
        ];

        const filteredRecommendations = { ...recommendations };

        excludeFields.forEach(path => {
            deleteByPath(filteredRecommendations, path);
        });

        res.json({
            symbol: symbol.toUpperCase(),
            data: filteredRecommendations,
            hasNulls: hasNullValues(filteredRecommendations)
        });
    } catch {
        res.status(500).json({
            error: "Failed to fetch recommendations"
        });
    }
});

export default router;
