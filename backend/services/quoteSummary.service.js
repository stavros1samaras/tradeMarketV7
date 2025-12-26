import { quoteSummary } from "../utils/quoteSummary.js";
import { hasNullValues } from "../utils/object.js";

export async function getQuoteSummary(symbol) {
    try {
        const data = await quoteSummary(symbol);

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
