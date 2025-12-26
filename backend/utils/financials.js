import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "./object.js";

export async function financials(symbol, query) {
    try {
        const { period1, period2, type } = query;

        if (!symbol) {
            return {
                status: 400,
                body: { error: "Symbol is required" }
            };
        }

        if (!period1 || !period2 || !type) {
            return {
                status: 400,
                body: { error: "period1, period2 and type are required" }
            };
        }

        const data = await yf.fundamentalsTimeSeries(symbol.toUpperCase(), {
            period1,
            period2,
            type,
            module: "financials"
        });

        if (!data) {
            return {
                status: 502,
                body: { error: "No data returned from Yahoo Finance" }
            };
        }

        const excludeFields = [
            "deferredRevenue",
            "otherCurrentLiabilities",
            "minorityInterest",
            "goodWill"
        ];

        const filteredData = { ...data };
        excludeFields.forEach(path => deleteByPath(filteredData, path));

        return {
            status: 200,
            body: {
                symbol: filteredData.symbol ?? symbol.toUpperCase(),
                data: filteredData,
                hasNulls: hasNullValues(filteredData)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message }
        };
    }
}
