import yf from "../services/yahoo.js";
import { deleteByPath } from "./object.js";

export async function search(symbol) {
    if (!symbol) {
        throw new Error("symbol is required");
    }

    const searchResults = await yf.search(symbol);

    if (!searchResults) {
        throw new Error("No data returned from Yahoo Finance");
    }

    const excludeFields = ["news"];

    const filtered = { ...searchResults };
    excludeFields.forEach(path => deleteByPath(filtered, path));

    return {
        symbol,
        data: filtered
    };
}
