import yf from "../services/yahoo.js";
import { deleteByPath } from "./object.js";

export async function quoteSummary(symbol) {
    if (!symbol) {
        throw new Error("Symbol is required");
    }

    const upperSymbol = symbol.toUpperCase();
    const summary = await yf.quoteSummary(upperSymbol, {
        modules: "all"
    });

    if (!summary) {
        throw new Error("No data returned from Yahoo Finance");
    }

    const excludeFields = [
        "preMarketTime"
    ];

    const filteredSummary = { ...summary };
    excludeFields.forEach(path => deleteByPath(filteredSummary, path));

    return {
        symbol: upperSymbol,
        data: filteredSummary
    };
}
