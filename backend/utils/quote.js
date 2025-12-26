import yf from "../services/yahoo.js";
import { deleteByPath, hasNullValues } from "./object.js";

export async function quote(symbol) {
    try {
        const upperSymbol = symbol.toUpperCase();
        const quoteData = await yf.quote(upperSymbol);

        if (!quoteData) {
            return {
                status: 502,
                body: { error: "No data returned from Yahoo Finance" }
            };
        }

        const excludeFields = [
            "earningsTimestamp",
            "earningsTimestampStart",
            "earningsTimestampEnd",
            "earningsCallTimestampStart",
            "earningsCallTimestampEnd"
        ];

        const filteredQuote = { ...quoteData };

        excludeFields.forEach(path => {
            deleteByPath(filteredQuote, path);
        });

        return {
            status: 200,
            body: {
                symbol: filteredQuote.symbol ?? upperSymbol,
                data: filteredQuote,
                hasNulls: hasNullValues(filteredQuote)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: "Failed to fetch quote" }
        };
    }
}
