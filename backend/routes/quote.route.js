import express from "express";
import { quote } from "../utils/quote.js";

const router = express.Router();

router.get("/:symbol", async (req, res) => {
    const result = await quote(req.params.symbol);

    const status = result.status;
    const body = result.body;

    res.status(status);
    res.json(body);
});

export default router;
