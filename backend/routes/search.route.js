import express from "express";
import { getSearch } from "../services/search.service.js";

const router = express.Router();

/**
 * GET http://localhost:3001/api/search/AAPL
 */
router.get("/:symbol", async (req, res) => {
    const result = await getSearch(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
