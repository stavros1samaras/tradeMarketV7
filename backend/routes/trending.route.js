import express from "express";
import { trending } from "../utils/trending.js";

const router = express.Router();

/**
 * GET /api/trending/US
*/
router.get("/:symbol", async (req, res) => {
    const result = await trending(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
