import yf from "../services/yahoo.js";
import { deleteByPath } from "./object.js";

export async function quote(symbol) {
    if (!symbol) {
        throw new Error("Symbol is required");
    }

    const upperSymbol = symbol.toUpperCase();
    const quoteData = await yf.quote(upperSymbol);

    if (!quoteData) {
        throw new Error("No data returned from Yahoo Finance");
    }

    const excludeFields = [
        "earningsTimestamp",
        "earningsTimestampStart",
        "earningsTimestampEnd",
        "earningsCallTimestampStart",
        "earningsCallTimestampEnd"
    ];

    const filtered = { ...quoteData };
    excludeFields.forEach(path => deleteByPath(filtered, path));

    return {
        symbol: filtered.symbol ?? upperSymbol,
        data: filtered
    };
}
