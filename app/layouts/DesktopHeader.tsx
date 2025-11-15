import { Link } from "react-router";
import MainNavigationMenu from '../components/NavigationMenu';
import Text from "~/components/Text";
import LivePrices from "./LivePrices";


export default function DesktopHeader() {
    return (
        <><MainNavigationMenu>
            <Link to="/technical/overview/BTC-USD">
                <Text>Techical</Text>
            </Link>
            <Link to="/fundamental/single-analysis">
                <Text>Fundamental</Text>
            </Link>
            <Link to="/sentiment">
                <Text>Sentiment</Text>
            </Link>
            <Link to="/contact">
                <Text>Contact</Text>
            </Link>
        </MainNavigationMenu>
            {/* <LivePrices /> */}
        </>
    );
}

