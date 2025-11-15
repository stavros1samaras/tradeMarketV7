import { Outlet } from 'react-router';
import FundamentalNavigation from '../routes/Fundamental/Components/fundamentalNavigation';

export default function FundamentalLayout() {
    return (
        <div>
            <FundamentalNavigation />
            <Outlet />
        </div>
    )
}