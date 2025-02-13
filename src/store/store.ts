import { create } from 'zustand';
import zustymiddlewarets from 'zustymiddlewarets';

import { DisplayJob, transformJobs } from '../schema/displayJob.ts';
import { transformRequest } from '../schema/request.ts';
import { transformContext } from '../schema/context.ts';

import { DataProperty } from '../schema/settings.ts';

// todo
interface ResultsData {
    timestamp: string;
    size: number;
    jobIds: string[];
}

interface State {
    bears: number;
    increase: (by: number) => void;

    isAuth: boolean;
    username: string;
    results: DisplayJob[];
    resultsSize: number;
    resultsEstimatedTotalSize: number;
    resultsLastTime: string;
    cookieValue: string;
    searchId: string;
    fingerprintId: string;
    request: Record<string, string>;
    context: Record<string, string>;
    settings: Record<string, DataProperty>;

    // todo
    updateAuth: (to: boolean) => void;
    updateUsername: (to: string) => void;
    updateResults: (add: ResultsData) => void;
    updateEstimatedTotalSize: (to: number) => void;
    updateCookieValue: (to: string) => void;
    updateSearchId: (to: string) => void;
    updateFingerprintId: (to: string) => void;
    updateRequest: (to: Record<string, string>) => void;
    updateContext: (to: Record<string, string>) => void;
    updateSettings: (add: Record<string, DataProperty>) => void;
}

const useStore = create<State>()(
    // todo - config for devtools
    zustymiddlewarets((set) => ({
        bears: 0,

        isAuth: false,
        username: '',
        results: [],
        resultsSize: 0,
        resultsEstimatedTotalSize: 0,
        resultsLastTime: '',
        cookieValue: '',
        searchId: '',
        fingerprintId: '',
        request: {},
        context: {},
        settings: {},

        increase: (by: number) =>
            set((state: { bears: number }) => ({ bears: state.bears + by })),

        updateAuth: (payload: boolean) => {
            set(() => ({
                isAuth: payload,
            }));
        },
        updateUsername: (payload: string) => {
            set(() => ({
                username: payload,
            }));
        },
        // todo - just pass results object
        updateResults: (payload: object) => {
            // @ts-expect-error ugh
            const transformedJobs = transformJobs(payload?.jobResults || []);
            set(() => ({
                results: transformedJobs,
                resultsSize: transformedJobs.length,
                resultsLastTime: new Date().toISOString(),
            }));
        },
        updateCookieValue: (payload: string) => {
            set(() => ({
                cookieValue: payload,
            }));
        },
        updateEstimatedTotalSize: (payload: number) => {
            set(() => ({
                resultsEstimatedTotalSize: payload,
            }));
        },
        updateSearchId: (payload: string) => {
            set(() => ({
                searchId: payload,
            }));
        },
        updateFingerprintId: (payload: string) => {
            set(() => ({
                fingerprintId: payload,
            }));
        },
        updateRequest: (payload: object) => {
            const transformedRequest = transformRequest(payload);
            set(() => ({
                request: transformedRequest,
            }));
        },
        updateContext: (payload: object) => {
            const transformedContext = transformContext(payload);
            set(() => ({
                context: transformedContext,
            }));
        },
        updateSettings: (payload: Record<string, DataProperty>) => {
            set(() => ({ settings: payload }));
        },
    }))
);

// todo - config for devtools
// note this is not exposed in top frame - need to select extension frame in order
// to access this in devtools

declare global {
    interface Window {
        store: typeof useStore;
    }
}
window.store = useStore;
export default useStore;
