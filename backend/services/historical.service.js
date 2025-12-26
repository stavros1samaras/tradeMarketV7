import { historical } from "../utils/historical.js";
import { hasNullValues } from "../utils/object.js";

export async function getHistorical(symbol, query) {
    try {
        const data = await historical(symbol, query);

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
