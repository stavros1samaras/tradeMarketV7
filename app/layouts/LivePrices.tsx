import { useFetcher } from "react-router";
import { useEffect } from "react";

export default function LivePrices() {
    const fetcher = useFetcher();

    // useEffect(() => {
    //     // Κάνε πρώτο fetch με το που μπει το component
    //     fetcher.submit({}, { method: "get", action: "/" });

    //     const id = setInterval(() => {
    //         fetcher.submit({}, { method: "get", action: "/" });
    //     }, 50000);

    //     return () => clearInterval(id);
    // }, []);

    return (
        <div>
            {/* {fetcher.data ? (
                <div>Τρέχουσα τιμή: {fetcher.data}</div>
            ) : (
                <div>Loading...</div>
            )} */}
        </div>
    );
}
