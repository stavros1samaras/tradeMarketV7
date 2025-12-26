
import express from "express";
import { getTrending } from "../services/trending.service.js";

const router = express.Router();

/**
 * GET /api/trending/US
*/
router.get("/:symbol", async (req, res) => {
    const result = await getTrending(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
