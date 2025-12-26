import { options } from "../utils/options.js";
import { hasNullValues } from "../utils/object.js";

export async function getOptions(symbol) {
    try {
        const data = await options(symbol);

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
