import { search } from "../utils/search.js";
import { hasNullValues } from "../utils/object.js";

export async function getSearch(symbol) {
    try {
        const data = await search(symbol);

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
