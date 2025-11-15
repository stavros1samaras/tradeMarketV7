import { Outlet } from 'react-router';
import DesktopHeader from './DesktopHeader';
// import type { Route } from './+types/service';
// import { currentSymbolPrice } from '~/utilities/client/prices';


// export async function loader({ params }: Route.LoaderArgs) {
//     console.log("stavrikossss")
//     return "1";
// }


// export async function clientAction({ request }: Route.ActionArgs) {
//     return (await currentSymbolPrice());
// }


export default function Service() {
    return (
        <>
            <DesktopHeader />
            <Outlet />

        </>
    )
}