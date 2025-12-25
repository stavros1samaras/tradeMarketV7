import express from "express";
import quoteRoute from "./routes/quote.route.js";
import insightsRoute from "./routes/insights.route.js";
import quoteSummaryRoute from "./routes/quoteSummary.route.js";
import quoteSummary2 from "./routes/quoteSummary2.route.js";
import recommendationsRoute from "./routes/recommendations.route.js";
import searchRoute from "./routes/search.route.js";
import trendingRoute from "./routes/trending.route.js";
import balanceSheetRoute from "./routes/balanceSheet.route.js";
import financials from "./routes/financials.route.js";
import cashFlow from "./routes/cashFlow.route.js";
import historical from "./routes/historical.route.js";
import options from "./routes/options.route.js";



import yf from "./services/yahoo.js";


const app = express();

app.use("/api/quote", quoteRoute);
app.use("/api/insights", insightsRoute);
app.use("/api/quote-summary", quoteSummaryRoute);
app.use("/api/quote-summary2", quoteSummary2);
app.use("/api/recommendations", recommendationsRoute);
app.use("/api/search", searchRoute);
app.use("/api/trending", trendingRoute);
app.use("/api/balance-sheet", balanceSheetRoute);
app.use("/api/financials", financials);
app.use("/api/cash-flow", cashFlow);
app.use("/api/historical", historical);
app.use("/api/options", options);


app.listen(3001, () => {
    console.log("Backend → http://localhost:3001");
});
