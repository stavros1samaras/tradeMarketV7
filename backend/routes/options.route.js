import express from "express";
import { options } from "../utils/options.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/options/AAPL
 */
router.get("/:symbol", async (req, res) => {
    const result = await options(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
