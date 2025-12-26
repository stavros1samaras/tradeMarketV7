import express from "express";
import { recommendations } from "../utils/recommendations.js";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    const result = await recommendations(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
