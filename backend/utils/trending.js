import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "./object.js";

export async function trending(symbol) {
    try {
        if (!symbol) {
            return {
                status: 400,
                body: { error: "Symbol is required" }
            };
        }

        const upperSymbol = symbol.toUpperCase();
        const trendingData = await yf.trendingSymbols(upperSymbol);

        if (!trendingData) {
            return {
                status: 502,
                body: { error: "No data returned from Yahoo Finance" }
            };
        }

        const excludeFields = [
            "finance",
            "meta"
        ];

        const filteredTrending = { ...trendingData };

        excludeFields.forEach(path => {
            deleteByPath(filteredTrending, path);
        });

        return {
            status: 200,
            body: {
                symbol: upperSymbol,
                data: filteredTrending,
                hasNulls: hasNullValues(filteredTrending)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: "Failed to fetch trending symbols" }
        };
    }
}
