import express from "express";
import { quoteSummary } from "../utils/quoteSummary.js";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    const result = await quoteSummary(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
