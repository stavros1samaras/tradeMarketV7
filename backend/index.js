import express from "express";
import YahooFinance from "yahoo-finance2";

const app = express();

const yf = new YahooFinance({ suppressNotices: ['ripHistorical'] });


// quote for faundamental
app.get("/api/quote/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const quoteData = await yf.quote(symbol.toUpperCase());

        const excludeFields = [
            "earningsTimestamp",
            "earningsTimestampStart",
            "earningsTimestampEnd",
            "earningsCallTimestampStart",
            "earningsCallTimestampEnd",
        ];

        const filteredQuote = { ...quoteData };
        excludeFields.forEach(field => delete filteredQuote[field]);

        res.json(filteredQuote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

function deleteByPath(obj, path) {
    const parts = path.split(".");
    let current = obj;

    for (let i = 0; i < parts.length - 1; i++) {
        if (!current || typeof current !== "object") return;
        current = current[parts[i]];
    }

    if (current && typeof current === "object") {
        delete current[parts[parts.length - 1]];
    }
}

app.get("/api/insights/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol is required" });
        }

        const insights = await yf.insights(symbol.toUpperCase());

        if (!insights) {
            return res.status(502).json({ error: "No data returned from Yahoo Finance" });
        }

        const excludeFields = [
            "recommendation.score",
            "instrumentInfo",
            "companySnapshot1.sectorInfo"
        ];

        const filteredInsights = { ...insights };

        excludeFields.forEach(path => {
            deleteByPath(filteredInsights, path);
        });

        const hasNulls = Object.values(filteredInsights).some(
            value => value === null || value === undefined
        );

        res.json({
            symbol: filteredInsights.symbol ?? symbol.toUpperCase(),
            data: filteredInsights,
            hasNulls
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch insights" });
    }
});


app.get("/api/insights2/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol is required" });
        }

        const insights = await yf.insights(symbol.toUpperCase());

        if (!insights) {
            return res.status(502).json({
                error: "No data returned from Yahoo Finance"
            });
        }

        const hasNulls = Object.values(insights).some(
            value => value === null || value === undefined
        );

        res.json({
            symbol: insights.symbol ?? symbol.toUpperCase(),
            data: insights,
            hasNulls
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Failed to fetch insights"
        });
    }
});




app.get("/api", async (req, res) => {
    try {

        const quote = await yf.insights("AAPL");

        const financialsData = await yf.fundamentalsTimeSeries('MSFT', {
            period1: '2020-01-01',
            type: 'annual',
            module: 'financials'
        });

        res.json({

            financialsData
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Backend → http://localhost:3000");
});
