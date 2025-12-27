import PriceChart from '~/components/priceChart2'
import type { Route } from './+types/overview';
import { useParams } from 'react-router';
import { overviewModule } from '../../modules/.server/technical'

// export async function loader({ params, request }: LoaderFunctionArgs) {

export async function loader({ params, request }: Route.LoaderArgs) {
    const data: any = await overviewModule(params, request);
    return data;
}

export default function overview({ loaderData }: { loaderData: any }) {

    let symbol = useParams();

    return (
        <>
            <h2>Bit Price Overview</h2>
            <PriceChart key={symbol.symbol} chartData={loaderData.pricePoints} />
            {JSON.stringify(loaderData.options)}
        </>
    )
}