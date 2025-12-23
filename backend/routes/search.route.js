import express from "express";
import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "../utils/object.js";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        if (!symbol) {
            return res.status(400).json({ error: "symbol is required" });
        }

        const searchResults = await yf.search(symbol);

        if (!searchResults) {
            return res.status(502).json({
                error: "No data returned from Yahoo Finance"
            });
        }

        const excludeFields = [
            "meta",
            "finance"
        ];

        const filteredSearch = { ...searchResults };

        excludeFields.forEach(path => {
            deleteByPath(filteredSearch, path);
        });

        res.json({
            symbol,
            data: filteredSearch,
            hasNulls: hasNullValues(filteredSearch)
        });
    } catch {
        res.status(500).json({
            error: "Failed to fetch search results"
        });
    }
});

export default router;
