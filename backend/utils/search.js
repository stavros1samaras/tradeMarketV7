import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "./object.js";

export async function search(symbol) {
    try {
        if (!symbol) {
            return {
                status: 400,
                body: { error: "symbol is required" }
            };
        }

        const searchResults = await yf.search(symbol);

        if (!searchResults) {
            return {
                status: 502,
                body: { error: "No data returned from Yahoo Finance" }
            };
        }

        const excludeFields = [
            "meta",
            "finance"
        ];

        const filteredSearch = { ...searchResults };

        excludeFields.forEach(path => {
            deleteByPath(filteredSearch, path);
        });

        return {
            status: 200,
            body: {
                symbol,
                data: filteredSearch,
                hasNulls: hasNullValues(filteredSearch)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: "Failed to fetch search results" }
        };
    }
}
