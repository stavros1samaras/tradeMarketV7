import { quote } from "../utils/quote.js";
import { hasNullValues } from "../utils/object.js";

export async function getQuote(symbol) {
    try {
        const data = await quote(symbol);

        return {
            status: 200,
            body: {
                ...data,
                hasNulls: hasNullValues(data.data)
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: {
                error: error.message
            }
        };
    }
}
