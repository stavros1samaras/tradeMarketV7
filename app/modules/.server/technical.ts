import type { Ticker } from "~/types/tickers";
import { fetchTickerPricePoints2 } from "~/utilities/.server/tickers";

export async function overviewModule(params: any, request: Request): Promise<any> {
    const requestURL = new URL(request.url);
    console.log(request.url)


    const requestUtility = requestURL.searchParams.get("requestUtility")
    if (requestUtility == null) {
        return (await pricePoints(params, request))
    }
    else if (requestUtility == "indexes") {
        console.log(requestUtility)
    }
    return (await pricePoints(params, request))
}

export async function pricePoints(params: any, request: Request) {
    const requestURL = new URL(request.url);
    // const requestURL = new URL("http://localhost:5173/se/technical/overview/BTC-USD?start=2023-01-02");
    // const requestURL = new URL("http://localhost:5173/se/technical/overview/BTC-USD?start=2024-12-06");

    const start: string = requestURL.searchParams.get("start") as string
    const ticker: Ticker = { symbol: params.symbol }

    if (start != null) {
        ticker.startDate = start
    }

    console.log(ticker)
    let pricePoints = await fetchTickerPricePoints2(ticker);
    return { pricePoints }
}


export async function generalIndexesScore(params: any, request: Request) {

}