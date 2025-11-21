import PriceChart from '~/components/priceChart2'
import { fetchTickerPricePoints } from '~/routes/resources/fetchTickerPricePoints';
import type { Ticker } from "~/types/tickers";
import type { Route } from './+types/overview';

export async function loader({ params }: Route.LoaderArgs) {
    const ticker: Ticker = { symbol: params.symbol }
    let pricePoints = await fetchTickerPricePoints(ticker);
    return ({ pricePoints })
}

export default function overview({ loaderData }: Route.ComponentProps) {

    return (
        <>
            <h2>Bit Price Overview</h2>
            <PriceChart chartData={loaderData.pricePoints} />
        </>
    )
}