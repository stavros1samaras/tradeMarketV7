import yf from "../services/yahoo.js";
import { deleteByPath } from "./object.js";

export async function financials(symbol, query) {
    if (!symbol) {
        throw new Error("Symbol is required");
    }

    const { period1, period2, type } = query;

    if (!period1 || !period2 || !type) {
        throw new Error("period1, period2 and type are required");
    }

    const data = await yf.fundamentalsTimeSeries(symbol.toUpperCase(), {
        period1,
        period2,
        type,
        module: "financials"
    });

    if (!data) {
        throw new Error("No data returned from Yahoo Finance");
    }

    const excludeFields = [
        "deferredRevenue",
        "otherCurrentLiabilities",
        "minorityInterest",
        "goodWill"
    ];

    const filtered = { ...data };
    excludeFields.forEach(path => deleteByPath(filtered, path));

    return {
        symbol: filtered.symbol ?? symbol.toUpperCase(),
        data: filtered
    };
}
