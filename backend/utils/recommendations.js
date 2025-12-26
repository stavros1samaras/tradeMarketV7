import yf from "../services/yahoo.js";
import { deleteByPath } from "./object.js";

export async function recommendations(symbol) {
    if (!symbol) {
        throw new Error("Symbol is required");
    }

    const upperSymbol = symbol.toUpperCase();
    const recommendationsData = await yf.recommendationsBySymbol(upperSymbol);

    if (!recommendationsData) {
        throw new Error("No data returned from Yahoo Finance");
    }

    const excludeFields = ["meta", "finance"];

    const filtered = { ...recommendationsData };
    excludeFields.forEach(path => deleteByPath(filtered, path));

    return {
        symbol: upperSymbol,
        data: filtered
    };
}
