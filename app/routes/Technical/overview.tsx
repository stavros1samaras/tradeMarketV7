import PriceChart from '~/components/priceChart2'
// import { fetchTickerPricePoints } from '~/routes/resources/fetchTickerPricePoints';
import type { Ticker } from "~/types/tickers";
import type { Route } from './+types/overview';
import { useParams } from 'react-router';
import { fetchTickerPricePoints } from '~/utilities/.server/tickers';
import { overviewModule } from '../../modules/.server/technical'

export async function loader({ params, request }: Route.LoaderArgs) {
    const ticker: Ticker = { symbol: params.symbol }
    let pricePoints = await fetchTickerPricePoints(ticker);
    return (await overviewModule(params, request))
    // console.log(request.url)
    const temp = request.url
    return ({ pricePoints, temp })
}

export default function overview({ loaderData }: Route.ComponentProps) {

    let symbol = useParams();

    return (
        <>
            <h2>Bit Price Overview</h2>
            <PriceChart key={symbol.symbol} chartData={loaderData.pricePoints} />
        </>
    )
}