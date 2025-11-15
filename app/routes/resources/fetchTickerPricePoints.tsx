import type { Ticker } from "~/types/tickers";
import { createTicker } from "../../utilities/.server/tickers";
import { BASE_URL } from "~/constants";
import type { Route } from "./+types/fetchTickerPricePoints";

export async function loader({ params, request }: Route.LoaderArgs) {

    const url = new URL(request.url);
    const ticker: Ticker = {
        symbol: params.ticker,
        startDate: url.searchParams.get("start") as string,
        endDate: url.searchParams.get("end") as string,
        interval: url.searchParams.get("interval") as string
    };
    const data = await fetchTickerPricePoints(ticker);

    return Response.json(data);
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




