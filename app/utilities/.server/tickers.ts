import type { Ticker } from "~/types/tickers";
import { currentDate, findPreviousMonthDate } from "../client/dates";
import { DEFAULT_INTERVAL } from "~/constants";


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