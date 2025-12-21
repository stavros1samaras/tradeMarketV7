import express from "express";
import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "../utils/object.js";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        const quoteData = await yf.quote(symbol.toUpperCase());

        if (!quoteData) {
            return res.status(502).json({ error: "No data returned from Yahoo Finance" });
        }

        const excludeFields = [
            "earningsTimestamp",
            "earningsTimestampStart",
            "earningsTimestampEnd",
            "earningsCallTimestampStart",
            "earningsCallTimestampEnd"
        ];

        const filteredQuote = { ...quoteData };

        excludeFields.forEach(path => {
            deleteByPath(filteredQuote, path);
        });

        res.json({
            symbol: filteredQuote.symbol ?? symbol.toUpperCase(),
            data: filteredQuote,
            hasNulls: hasNullValues(filteredQuote)
        });
    } catch {
        res.status(500).json({ error: "Failed to fetch quote" });
    }
});

export default router;
