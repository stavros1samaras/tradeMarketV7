import { Outlet } from 'react-router'
import TechnicalNavigation from '../routes/Technical/Components/TechnicalNavigation'
import DesktopTickerSidebar from './DesktopTickerSidebar'
import type { Route } from './+types/technical';


// export async function loader({ params }: Route.LoaderArgs) {
//     console.log("samarikosssss")
//     return "1";
// }


export default function TechnicalLayout() {
    return (
        <div className="flex w-full h-full">
            <DesktopTickerSidebar />
            <div className="flex flex-col w-3/2">
                <TechnicalNavigation />
                <Outlet />
            </div>
        </div>
    )
}