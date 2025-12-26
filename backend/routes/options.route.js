import express from "express";
import { getOptions } from "../services/options.service.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/options/AAPL
 */
router.get("/:symbol", async (req, res) => {
    const result = await getOptions(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
