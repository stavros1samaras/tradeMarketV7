import yf from "../services/yahoo.js";
import { hasNullValues } from "./object.js";

export async function options(symbol) {
    try {
        if (!symbol) {
            return {
                status: 400,
                body: { error: "Symbol is required" }
            };
        }

        const optionsData = await yf.options(symbol);

        if (!optionsData) {
            return {
                status: 502,
                body: { error: "No options data returned from Yahoo Finance" }
            };
        }

        const {
            underlyingSymbol,
            expirationDates,
            options
        } = optionsData;

        return {
            status: 200,
            body: {
                symbol: underlyingSymbol ?? symbol.toUpperCase(),
                expirationDates,
                data: options,
                hasNulls: hasNullValues(options)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message }
        };
    }
}
