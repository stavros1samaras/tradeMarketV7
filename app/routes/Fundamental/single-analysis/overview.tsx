import { overviewModule } from "~/modules/.server/fundamental";
import type { Route } from "./+types/overview";
import PriceChart from '~/components/priceChart2'
import { useParams } from "react-router";

export async function loader({ params, request }: Route.LoaderArgs) {


    const data: any = await overviewModule(params, request);
    return { data };
}


export default function Overview({ loaderData }: { loaderData: any }) {

    let symbol = useParams();

    return (
        <PriceChart key={symbol.symbol} chartData={loaderData.data} />

    )
}