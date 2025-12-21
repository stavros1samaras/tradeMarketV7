import express from "express";
import quoteRoute from "./routes/quote.route.js";
import insightsRoute from "./routes/insights.route.js";

const app = express();

app.use("/api/quote", quoteRoute);
app.use("/api/insights", insightsRoute);

app.listen(3000, () => {
    console.log("Backend → http://localhost:3000");
});
