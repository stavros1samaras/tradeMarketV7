import { overviewModule } from "~/modules/.server/fundamental";
import type { Route } from "./+types/overview";
import PriceChart from '~/components/priceChart2'
import { useParams } from "react-router";

export async function loader({ params, request }: Route.LoaderArgs) {
    // const ticker: Ticker = { symbol: params.symbol }
    console.log(request.url)
    const data: any = await overviewModule(params, request);

    return Response.json(data.pricePoints ?? data);
}


export default function Overview({ loaderData }: { loaderData: any }) {

    let symbol = useParams();

    return (
        <PriceChart key={symbol.symbol} chartData={loaderData.pricePoints ?? loaderData} />

    )
}