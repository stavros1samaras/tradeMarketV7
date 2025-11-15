import { Outlet } from 'react-router';
import DesktopHeader from './DesktopHeader';
import { currentSymbolPrice } from '~/utilities/.server/prices';
import type { Route } from './+types/service';


export async function loader({ params }: Route.LoaderArgs) {
    // console.log(await currentSymbolPrice())
    return (await currentSymbolPrice());
}


export async function action({ request }: Route.ActionArgs) {
    // console.log(await currentSymbolPrice())
    return (await currentSymbolPrice());
}


export default function Service() {
    return (
        <>
            <DesktopHeader />
            <Outlet />

        </>
    )
}