import express from "express";
import { getQuote } from "../services/quote.service.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/quote/AAPL
 */

router.get("/:symbol", async (req, res) => {
    const result = await getQuote(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
