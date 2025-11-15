import SidebarTickers from "~/components/SidebarTickers";
import { SUPPORTED_TICKERS } from "~/constants";

import ExampleScrollArea from "~/components/ExampleScrollArea";

export default function DesktopTickerSidebar() {
    return (
        <>
            <ExampleScrollArea>
                <span className="flex flex-col w-1/6">
                    {SUPPORTED_TICKERS.map((asset) => (
                        <SidebarTickers key={asset.name} name={asset.name} symbol={asset.symbol} />
                    ))}
                </span>
            </ExampleScrollArea>
        </>
    )
}