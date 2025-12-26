import yf from "../services/yahoo.js";
import { deleteByPath } from "./object.js";

export async function trending(symbol) {
    if (!symbol) {
        throw new Error("Symbol is required");
    }

    const upperSymbol = symbol.toUpperCase();
    const trendingData = await yf.trendingSymbols(upperSymbol);

    if (!trendingData) {
        throw new Error("No data returned from Yahoo Finance");
    }

    const excludeFields = [
        // "finance", "meta"
    ];

    const filtered = { ...trendingData };
    excludeFields.forEach(path => deleteByPath(filtered, path));

    return {
        symbol: upperSymbol,
        data: filtered
    };
}
