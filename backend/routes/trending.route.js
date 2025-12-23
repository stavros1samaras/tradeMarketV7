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

        const trending = await yf.trendingSymbols(symbol.toUpperCase());

        if (!trending) {
            return res.status(502).json({
                error: "No data returned from Yahoo Finance"
            });
        }

        const excludeFields = [
            "finance",
            "meta"
        ];

        const filteredTrending = { ...trending };

        excludeFields.forEach(path => {
            deleteByPath(filteredTrending, path);
        });

        res.json({
            symbol: symbol.toUpperCase(),
            data: filteredTrending,
            hasNulls: hasNullValues(filteredTrending)
        });
    } catch {
        res.status(500).json({
            error: "Failed to fetch trending symbols"
        });
    }
});

export default router;
