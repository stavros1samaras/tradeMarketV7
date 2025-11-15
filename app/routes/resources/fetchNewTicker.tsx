import { redirect } from "react-router";
import type { Route } from "./+types/fetchNewTicker";

export async function loader({ params }: Route.ClientActionArgs) {
    throw redirect(`/technical/overview/${params.ticker}`)

}