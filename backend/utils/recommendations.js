import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "./object.js";

export async function recommendations(symbol) {
    try {
        if (!symbol) {
            return {
                status: 400,
                body: { error: "Symbol is required" }
            };
        }

        const upperSymbol = symbol.toUpperCase();
        const recommendationsData = await yf.recommendationsBySymbol(upperSymbol);

        if (!recommendationsData) {
            return {
                status: 502,
                body: { error: "No data returned from Yahoo Finance" }
            };
        }

        const excludeFields = [
            "meta",
            "finance"
        ];

        const filteredRecommendations = { ...recommendationsData };

        excludeFields.forEach(path => {
            deleteByPath(filteredRecommendations, path);
        });

        return {
            status: 200,
            body: {
                symbol: upperSymbol,
                data: filteredRecommendations,
                hasNulls: hasNullValues(filteredRecommendations)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: "Failed to fetch recommendations" }
        };
    }
}
