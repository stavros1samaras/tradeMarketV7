import express from "express";
import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "../utils/object.js";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const { period1, period2, type } = req.query;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol is required" });
        }

        if (!period1 || !type) {
            return res.status(400).json({
                error: "Query params period1 and type are required"
            });
        }

        const balanceSheetData = await yf.fundamentalsTimeSeries(
            symbol.toUpperCase(),
            {
                period1,
                period2,
                type,
                module: "balance-sheet"
            }
        );

        if (!balanceSheetData) {
            return res.status(502).json({
                error: "No data returned from Yahoo Finance"
            });
        }

        const excludeFields = [
            "meta",
            "finance"
        ];

        // const filteredBalanceSheet = { ...balanceSheetData };
        const filteredBalanceSheet = JSON.parse(
            JSON.stringify(balanceSheetData)
        );


        excludeFields.forEach(path => {
            deleteByPath(filteredBalanceSheet, path);
        });

        res.json({
            symbol: symbol.toUpperCase(),
            data: filteredBalanceSheet,
            hasNulls: hasNullValues(filteredBalanceSheet)
        });
    } catch {
        res.status(500).json({
            error: "Failed to fetch balance sheet data"
        });
    }
});



export default router;
