import { overviewModule } from "~/modules/.server/fundamental";
import type { Route } from "./+types/overview";
import PriceChart from '~/components/priceChart2'
import { useParams, data as res } from "react-router";
import type { TechnicalOverviewData } from "~/types/types";

export async function loader({ params, request }: Route.LoaderArgs) {
    const data: TechnicalOverviewData = await overviewModule(params, request);
    return res(data, { status: 200 });
}


export default function Overview({ loaderData }: Route.ComponentProps) {

    let symbol = useParams();

    return (
        <PriceChart key={symbol.symbol} chartData={loaderData.pricePoints} />

    )
}