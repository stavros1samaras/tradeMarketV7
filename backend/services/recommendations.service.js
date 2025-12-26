import { recommendations } from "../utils/recommendations.js";
import { hasNullValues } from "../utils/object.js";

export async function getRecommendations(symbol) {
    try {
        const data = await recommendations(symbol);

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
