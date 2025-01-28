import {
    createRouter,
    createHashHistory,
    createRoute,
    createRootRoute,
} from '@tanstack/react-router';

import { Results } from './results/Results.tsx';
import { AppLayout } from './AppLayout.tsx';
import { Settings } from './settings/Settings.tsx';
import './App.css';

const hashHistory = createHashHistory();

const rootRoute = createRootRoute({
    component: AppLayout,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Results,
});

const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/settings',
    component: Settings,
});

const routeTree = rootRoute.addChildren([indexRoute, settingsRoute]);
export const router = createRouter({ routeTree, history: hashHistory });
