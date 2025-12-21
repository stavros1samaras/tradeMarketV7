import SidebarTickers from "~/components/SidebarTickers";
import { SUPPORTED_TICKERS } from "~/constants";

import ExampleScrollArea from "~/components/ExampleScrollArea";

export default function DesktopTickerSidebar({ type = "all" }: any) {
    return (
        <>
            <ExampleScrollArea>
                <span className="flex flex-col w-1/6">
                    {SUPPORTED_TICKERS.map((asset) => {
                        if (type == "all") {
                            return (<SidebarTickers key={asset.name} name={asset.name} symbol={asset.symbol} />)
                        }
                        else if (type == "stocks") {
                            if (asset.exchange == "CRYPTO") {
                                return null
                            }
                            else {
                                return (<SidebarTickers key={asset.name} name={asset.name} symbol={asset.symbol} />)
                            }
                        }
                    })}
                </span>
            </ExampleScrollArea>
        </>
    )
}