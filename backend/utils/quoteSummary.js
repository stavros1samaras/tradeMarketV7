import yf from "../services/yahoo.js";
import { deleteByPath } from "./object.js";

export async function quoteSummary(symbol) {
    if (!symbol) {
        throw new Error("Symbol is required");
    }

    const upperSymbol = symbol.toUpperCase();
    const summary = await yf.quoteSummary(upperSymbol);

    if (!summary) {
        throw new Error("No data returned from Yahoo Finance");
    }

    const excludeFields = [
        "price.regularMarketOpen",
        "price.regularMarketPreviousClose",
        "defaultKeyStatistics.enterpriseValue",
        "financialData.currentPrice"
    ];

    const filteredSummary = { ...summary };
    excludeFields.forEach(path => deleteByPath(filteredSummary, path));

    return {
        symbol: upperSymbol,
        data: filteredSummary
    };
}
