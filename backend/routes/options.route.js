import express from "express";
import yf from "../services/yahoo.js";
import { hasNullValues } from "../utils/object.js";

const router = express.Router();

// http://localhost:3001/api/options/AAPL
router.get("/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol is required" });
        }

        const optionsData = await yf.options(symbol);

        if (!optionsData) {
            return res.status(502).json({ error: "No options data returned from Yahoo Finance" });
        }

        const {
            underlyingSymbol,
            expirationDates,
            options
        } = optionsData;

        res.json({
            symbol: underlyingSymbol ?? symbol.toUpperCase(),
            expirationDates,
            data: options,
            hasNulls: hasNullValues(options)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
