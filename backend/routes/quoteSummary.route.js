import express from "express";
import { getQuoteSummary } from "../services/quoteSummary.service.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/quote-summary/AAPL
 */
router.get("/:symbol", async (req, res) => {
    const result = await getQuoteSummary(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
