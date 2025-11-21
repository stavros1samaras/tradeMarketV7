import { Form, Link, useFetcher } from "react-router";
import { useLocation } from 'react-router'
import { Button } from "./ui/button";

//NEED TO REFACTOR RESOURCE ROUTE SO THE COMPONENT (WHITCH I DONT REMOMBER WHO IT IS) WON'T
//FETCH THE RESOURCE WITH fetch() BUT WITH A FETCHER AND AN ACTION
//I NEED TO REFACTOR THE FUNCTION MAYBE 
//I WRITE THIS HERE NOT TO FORGET IT

export default function SidebarTickers({ name, symbol }: any) {

    let location = useLocation();
    const encodedFrom = encodeURIComponent(location.pathname);
    const fetcher = useFetcher();

    const handleClick = () => {
        fetcher.load(`/fetchNewTicker/${symbol}/${encodedFrom}`);
    };

    return (
        // <Link to={`/fetchNewTicker/${symbol}/${encodedFrom}`} >
        <Button onClick={handleClick} variant="code" size="default">
            <code>{name}</code>
        </Button>
        // </Link>
    )
}