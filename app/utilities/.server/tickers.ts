import type { Ticker } from "~/types/tickers";
import { currentDate, findPreviousMonthDate } from "../client/dates";
import { BASE_URL, DEFAULT_INTERVAL } from "~/constants";


export const createTicker = (userTicker: Ticker): Ticker => {

    let ticker: Ticker = { ...userTicker };
    if (!ticker.startDate) {
        ticker.startDate = findPreviousMonthDate().startDate as string;
    }
    if (!ticker.endDate || ticker.endDate == "undefined") {
        ticker.endDate = currentDate();
    }
    if (!ticker.interval || ticker.interval == "undefined") {
        ticker.interval = DEFAULT_INTERVAL;
    }
    return (ticker);

}



export async function fetchTickerPricePoints(userTicker: Ticker) {

    const ticker: Ticker = createTicker(userTicker);

    const url: string = `${BASE_URL}/ta/data/prices?ticker=${ticker.symbol}&start=${ticker.startDate}&end=${ticker.endDate}&interval=${ticker.interval}`;
    try {
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        // console.log(result["BTC-USD"]);
        return (result[ticker.symbol]);

    } catch (error: any) {
        console.error(error.message);
    }
}

