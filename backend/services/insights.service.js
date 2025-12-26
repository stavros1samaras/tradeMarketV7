import { insights } from "../utils/insights.js";
import { hasNullValues } from "../utils/object.js";

export async function getInsights(symbol) {
    try {
        const data = await insights(symbol);

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
