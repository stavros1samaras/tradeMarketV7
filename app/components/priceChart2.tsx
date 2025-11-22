import { Suspense, useEffect, useRef, useState } from "react";
// import { fetchTickerPriceGraph } from '~/routes/resources/fetchTickerPriceGraph';
import { findPreviousMonthDate, findPreviousYearDate } from '~/utilities/client/dates';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Legend, } from 'recharts';
import type { Ticker } from "~/types/tickers";
import type { date } from "~/types/date";
import { MAX_START_DATE, MAX_INTERVAL, ONE_MONTH_INTERVAL, ONE_YEAR_INTERVAL } from "~/constants";
import { useFetcher, useLoaderData, useParams } from "react-router";
// import React from "react";
import * as React from 'react';
import { Tabs } from '@base-ui-components/react/tabs';



interface props {
    chartData: any
    loaderData?: any
}

export function GraphTabs({ month, oneYear, max }: any) {
    const rootClasses = "rounded-md border border-gray-200";

    const listClasses = "relative z-0 flex gap-1 px-1 shadow-[inset_0_-1px] shadow-gray-200";

    const tabClasses = "flex h-8 items-center justify-center border-0 px-2 text-sm font-medium break-keep whitespace-nowrap text-gray-600 outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-blue-800 hover:text-gray-900 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline focus-visible:before:outline-2 data-[selected]:text-gray-900";

    const indicatorClasses = "absolute top-1/2 left-0 z-[-1] h-6 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-sm bg-gray-100 transition-all duration-200 ease-in-out";

    const tabs = [
        { value: "1 month", label: "1 month", onClick: month },
        { value: "1 year", label: "1 year", onClick: oneYear },
        { value: "max", label: "max", onClick: max },
    ];

    return (
        <Tabs.Root className={rootClasses} defaultValue="overview">
            <Tabs.List className={listClasses}>
                {tabs.map(({ value, label, onClick }) => (
                    <Tabs.Tab key={value} className={tabClasses} value={value}>
                        <button onClick={onClick}>{label}</button>
                    </Tabs.Tab>
                ))}
                <Tabs.Indicator className={indicatorClasses} />
            </Tabs.List>
        </Tabs.Root>
    );
}

export default function PriceChart2({ chartData }: props) {

    let { symbol } = useParams();
    const symbolAsked: string = symbol as string;

    // const { pricePoints } = useLoaderData();

    const [data, setData] = useState(chartData);
    const [datesPerPeriod, setDatesPerPeriod] = useState<number>(100);

    let oneYearRangeRef = useRef(null);
    let oneMonthRangeRef = useRef(null);
    let maxRangeRef = useRef<any>(null);

    const fetchTickerPricePoints = async (ticker: Ticker) => {
        const res = await fetch(`/fetchTickerPricePoints/${ticker.symbol}?start=${ticker.startDate}&end=${ticker.endDate}&interval=${ticker.interval}`);
        const pricePoints = await res.json();
        console.log(pricePoints);
        return (pricePoints);
    }

    const oneYearDate = async (): Promise<void> => {
        if (oneYearRangeRef.current === null) {
            const previousYearDate: date = { ...findPreviousYearDate() };
            const ticker: Ticker = { symbol: symbolAsked, startDate: previousYearDate.startDate }
            oneYearRangeRef.current = await fetchTickerPricePoints(ticker);
        }
        setData(oneYearRangeRef.current);
        setDatesPerPeriod(ONE_YEAR_INTERVAL);
    }

    const maxPeriod = async () => {
        if (maxRangeRef.current === null) {
            const ticker: Ticker = { symbol: symbolAsked, startDate: MAX_START_DATE }
            maxRangeRef.current = await fetchTickerPricePoints(ticker);
        }
        setData(maxRangeRef.current);
        setDatesPerPeriod(MAX_INTERVAL);
    }

    const oneMonth = async () => {
        if (oneMonthRangeRef.current === null) {
            const previousMonthDate: date = { ...findPreviousMonthDate() };
            const ticker: Ticker = { symbol: symbolAsked, startDate: previousMonthDate.startDate }
            oneMonthRangeRef.current = await fetchTickerPricePoints(ticker);
        }
        setData(oneMonthRangeRef.current);
        setDatesPerPeriod(ONE_MONTH_INTERVAL);
    }

    return (
        <>
            <GraphTabs month={oneMonth} oneYear={oneYearDate} max={maxPeriod} />
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,

                    }}
                >
                    <CartesianGrid strokeDasharray="100 100" vertical={false} />
                    <XAxis dataKey="Date" interval={datesPerPeriod}
                        tickFormatter={(date, index) => {
                            if (index === 0) return ""; // krivei tin prwti timi
                            return date.split("T")[0]; // krata tin imerominia prin to T
                        }} />
                    {/* <YAxis domain={['dataMin-1000', 'dataMax+1000']} /> */}
                    <YAxis />

                    <Tooltip />
                    <Area type="monotone" dataKey="close" isAnimationActive={false} stroke="#004bedff" fill="#8884d8" name="Bitcoin Price" />
                    <Legend verticalAlign="top" align="right" />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}
