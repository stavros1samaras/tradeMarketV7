import yf from "../services/yahoo.js";
import { deleteByPath } from "./object.js";

export async function options(symbol) {
    if (!symbol) {
        throw new Error("Symbol is required");
    }

    const optionsData = await yf.options(symbol.toUpperCase());

    if (!optionsData) {
        throw new Error("No options data returned from Yahoo Finance");
    }

    const {
        underlyingSymbol,
        expirationDates,
        options
    } = optionsData;

    const excludeFields = [
        "0.calls",
    ];

    const filteredOptions = { ...options };

    excludeFields.forEach(path => {
        deleteByPath(filteredOptions, path);
    });

    return {
        symbol: underlyingSymbol ?? symbol.toUpperCase(),
        expirationDates,
        data: filteredOptions
    };
}
