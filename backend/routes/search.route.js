import express from "express";
import { search } from "../utils/search.js";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    const result = await search(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
