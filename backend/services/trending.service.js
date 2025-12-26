import { trending } from "../utils/trending.js";
import { hasNullValues } from "../utils/object.js";

export async function getTrending(symbol) {
    try {
        const data = await trending(symbol);

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
