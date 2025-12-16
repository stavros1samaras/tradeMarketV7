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

app.get("/api/insights/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const insights = await yf.insights(symbol.toUpperCase());

        const filteredInsights = {
            symbol: insights.symbol,

            companySnapshot: insights.companySnapshot
                ? {
                    sector: insights.companySnapshot.sector,
                    sectorInfo: insights.companySnapshot.sectorInfo,
                    company: insights.companySnapshot.company
                }
                : null,

            recommendation: insights.recommendation
                ? {
                    direction: insights.recommendation.direction,
                    score: insights.recommendation.score,
                    scoreDescription: insights.recommendation.scoreDescription,
                    sectorDirection: insights.recommendation.sectorDirection,
                    indexDirection: insights.recommendation.indexDirection
                }
                : null,

            instrumentInfo: insights.instrumentInfo
                ? {
                    keyTechnicals: insights.instrumentInfo.keyTechnicals,
                    technicalEvents: insights.instrumentInfo.technicalEvents,
                    valuation: insights.instrumentInfo.valuation
                }
                : null,

            reports: Array.isArray(insights.reports)
                ? insights.reports.map(r => ({
                    provider: r.provider,
                    reportDate: r.reportDate,
                    reportTitle: r.reportTitle,
                    investmentRating: r.investmentRating,
                    targetPrice: r.targetPrice,
                    targetPriceStatus: r.targetPriceStatus
                }))
                : [],

            events: Array.isArray(insights.events)
                ? insights.events.map(e => ({
                    eventType: e.eventType,
                    pricePeriod: e.pricePeriod,
                    tradeType: e.tradeType,
                    tradingHorizon: e.tradingHorizon,
                    startDate: e.startDate,
                    endDate: e.endDate
                }))
                : []
        };

        res.json(filteredInsights);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
