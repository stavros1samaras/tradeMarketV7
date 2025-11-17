import { useFetcher, useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import type { loader } from "./service";

export default function LivePrices() {

    let invoices = useLoaderData<typeof loader>();
    const [prices, setPrices] = useState(invoices);

    console.log(invoices);
    const fetcher = useFetcher();

    useEffect(() => {

        const id = setInterval(() => {
            fetcher.submit({}, { method: "post", action: "/se" });
        }, 93000);

        return () => clearInterval(id);
    }, []);

    // useEffect(() => {
    //     // Κάνε πρώτο fetch με το που μπει το component
    //     fetcher.submit({}, { method: "post", action: "/se" });

    //     const id = setInterval(() => {
    //         fetcher.submit({}, { method: "post", action: "/se" });
    //     }, 93000);

    //     return () => clearInterval(id);
    // }, []);

    return (
        <div>
            {invoices ? (
                <div>Τρέχουσα τιμή: {JSON.stringify(invoices)}</div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
        // <div>
        //     {fetcher.data ? (
        //         <div>Τρέχουσα τιμή: {JSON.stringify(fetcher.data)}</div>
        //     ) : (
        //         <div>Loading...</div>
        //     )}
        // </div>


    );
}
