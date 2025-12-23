import express from "express";
import quoteRoute from "./routes/quote.route.js";
import insightsRoute from "./routes/insights.route.js";
import quoteSummaryRoute from "./routes/quoteSummary.route.js";
import recommendationsRoute from "./routes/recommendations.route.js";
import searchRoute from "./routes/search.route.js";
import trendingRoute from "./routes/trending.route.js";
import balanceSheetRoute from "./routes/balanceSheet.route.js";
import yf from "./services/yahoo.js";


const app = express();

app.use("/api/quote", quoteRoute);
app.use("/api/insights", insightsRoute);
app.use("/api/quote-summary", quoteSummaryRoute);
app.use("/api/recommendations", recommendationsRoute);
app.use("/api/search", searchRoute);
app.use("/api/trending", trendingRoute);
app.use("/api/balance-sheet", balanceSheetRoute);

app.get("/api/test/balance-sheet", async (req, res) => {
    try {
        const data = await yf.fundamentalsTimeSeries("AAPL", {
            period1: "2024-01-01",
            type: "quarterly",
            module: "balance-sheet"
        });


        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});


app.get("/api/test/financials", async (req, res) => {
    try {
        const financialsData = await yf.fundamentalsTimeSeries("MSFT", {
            period1: "2020-01-01",
            type: "annual",
            module: "financials"
        });
        // console.log(res.json(financialsData))
        res.json(financialsData);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});


app.listen(3000, () => {
    console.log("Backend → http://localhost:3000");
});
