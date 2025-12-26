import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "./object.js";

export async function insights(symbol) {
    try {
        if (!symbol) {
            return {
                status: 400,
                body: { error: "Symbol is required" }
            };
        }

        const upperSymbol = symbol.toUpperCase();
        const insightsData = await yf.insights(upperSymbol);

        if (!insightsData) {
            return {
                status: 502,
                body: { error: "No data returned from Yahoo Finance" }
            };
        }

        const excludeFields = [
            "recommendation.score",
            "instrumentInfo",
            "companySnapshot1.sectorInfo"
        ];

        const filteredInsights = { ...insightsData };

        excludeFields.forEach(path => {
            deleteByPath(filteredInsights, path);
        });

        return {
            status: 200,
            body: {
                symbol: filteredInsights.symbol ?? upperSymbol,
                data: filteredInsights,
                hasNulls: hasNullValues(filteredInsights)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: "Failed to fetch insights" }
        };
    }
}
