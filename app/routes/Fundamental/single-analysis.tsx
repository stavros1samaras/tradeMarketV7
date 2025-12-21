import { Outlet, useParams } from "react-router";
import DesktopTickerSidebar from "~/layouts/DesktopTickerSidebar";
import NavigationMenu from "./single-analysis/NavigationMenu";

export default function SingleAnalysis() {

    const params = useParams();
    console.log(params);
    return (
        <div className="flex w-full h-full">
            <DesktopTickerSidebar type={"stocks"} />
            <div className="flex flex-col w-3/2">
                <NavigationMenu />
                <Outlet />

            </div>
        </div>
    )
}