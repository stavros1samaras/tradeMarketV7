import { Form, Link, useFetcher, useMatch } from "react-router";
import { useLocation } from 'react-router'
import { Button } from "./ui/button";

//NEED TO REFACTOR RESOURCE ROUTE SO THE COMPONENT (WHITCH I DONT REMOMBER WHO IT IS) WON'T
//FETCH THE RESOURCE WITH fetch() BUT WITH A FETCHER AND AN ACTION
//I NEED TO REFACTOR THE FUNCTION MAYBE 
//I WRITE THIS HERE NOT TO FORGET IT

export default function SidebarTickers({ name, symbol }: any) {

    const location = useLocation();
    const fetcher = useFetcher();

    const currentPath = location.pathname;
    const cleanedPath = currentPath.substring(
        0,
        currentPath.lastIndexOf("/")
    );
    const encodedFrom = encodeURIComponent(cleanedPath);

    const handleClick = () => {
        fetcher.load(`/fetchNewTicker/${symbol}/${encodedFrom}`);
    };

    return (
        <Button onClick={handleClick} variant="code" size="default">
            <code>{name}</code>
        </Button>
    );
}