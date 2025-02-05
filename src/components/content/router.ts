import {
    createRouter,
    createHashHistory,
    createRoute,
    createRootRoute,
} from '@tanstack/react-router';

import { Results } from './results/Results.tsx';
import { AppLayout } from './AppLayout.tsx';
import { Settings } from './settings/Settings.tsx';
import { Request } from './request/Request.tsx';
import { Info } from './info/Info.tsx';
import { Sites } from './sites/Sites.tsx';
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

const requestRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/request',
    component: Request,
});

const sitesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sites',
    component: Sites,
});

const infoRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/info',
    component: Info,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    settingsRoute,
    requestRoute,
    sitesRoute,
    infoRoute,
]);
export const router = createRouter({ routeTree, history: hashHistory });
