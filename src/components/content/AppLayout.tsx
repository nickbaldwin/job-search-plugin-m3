import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const AppLayout = () => (
    <div>
        <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
                Results
            </Link>{' '}
            <Link to="/settings" className="[&.active]:font-bold">
                Settings
            </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </div>
);
