import yf from "../services/yahoo.js";

export async function historical(symbol, query) {
    const { period1, period2 } = query;

    if (!symbol) {
        throw new Error("Symbol is required");
    }

    if (!period1 || !period2) {
        throw new Error("period1 and period2 are required");
    }

    const history = await yf.historical(symbol.toUpperCase(), {
        period1,
        period2
    });

    if (!history || history.length === 0) {
        throw new Error("No historical data returned from Yahoo Finance");
    }

    return {
        symbol: symbol.toUpperCase(),
        count: history.length,
        data: history
    };
}
