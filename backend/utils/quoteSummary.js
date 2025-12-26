import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "./object.js";

export async function quoteSummary(symbol) {
    try {
        if (!symbol) {
            return {
                status: 400,
                body: { error: "Symbol is required" }
            };
        }

        const upperSymbol = symbol.toUpperCase();
        const summary = await yf.quoteSummary(upperSymbol);

        if (!summary) {
            return {
                status: 502,
                body: { error: "No data returned from Yahoo Finance" }
            };
        }

        const excludeFields = [
            "price.regularMarketOpen",
            "price.regularMarketPreviousClose",
            "defaultKeyStatistics.enterpriseValue",
            "financialData.currentPrice"
        ];

        const filteredSummary = { ...summary };

        excludeFields.forEach(path => {
            deleteByPath(filteredSummary, path);
        });

        return {
            status: 200,
            body: {
                symbol: upperSymbol,
                data: filteredSummary,
                hasNulls: hasNullValues(filteredSummary)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: "Failed to fetch quote summary" }
        };
    }
}
