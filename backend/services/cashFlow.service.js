import { cashFlow } from "../utils/cashFlow.js";
import { hasNullValues } from "../utils/object.js";

export async function getCashFlow(symbol, query) {
    try {
        const data = await cashFlow(symbol, query);

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
