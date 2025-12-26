import { financials } from "../utils/financials.js";
import { hasNullValues } from "../utils/object.js";

export async function getFinancials(symbol, query) {
    try {
        const data = await financials(symbol, query);

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
