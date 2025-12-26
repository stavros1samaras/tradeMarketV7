import yf from "../services/yahoo.js";
import { hasNullValues } from "./object.js";

export async function historical(symbol, query) {
    try {
        const { period1, period2 } = query;

        if (!symbol) {
            return {
                status: 400,
                body: { error: "Symbol is required" }
            };
        }

        if (!period1 || !period2) {
            return {
                status: 400,
                body: { error: "period1 and period2 are required" }
            };
        }

        const history = await yf.historical(symbol, {
            period1,
            period2
        });

        if (!history || history.length === 0) {
            return {
                status: 502,
                body: { error: "No historical data returned from Yahoo Finance" }
            };
        }

        return {
            status: 200,
            body: {
                symbol: symbol.toUpperCase(),
                count: history.length,
                data: history,
                hasNulls: hasNullValues(history)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message }
        };
    }
}
