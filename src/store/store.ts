import { create } from 'zustand';
import zustymiddlewarets from 'zustymiddlewarets';

import { DisplayJob, transformJobs } from '../schema/displayJob.ts';
import { DataProperty } from '../schema/settings.ts';

interface ResultsData {
    timestamp: string;
    size: number;
    jobIds: string[];
}

interface State {
    bears: number;
    increase: (by: number) => void;

    resultsSize: number;
    results: DisplayJob[];
    resultsLast: ResultsData | null;
    resultsHistory: ResultsData[];
    updateResults: (add: ResultsData) => void;

    settings: Record<string, DataProperty>;
    updateSettings: (add: Record<string, DataProperty>) => void;

    url: string;
    urlHistory: string[];
    updateUrl: (to: string) => void;
}

const useStore = create<State>()(
    // todo - config for devtools
    // @ts-expect-error any
    zustymiddlewarets((set) => ({
        bears: 0,

        results: [],
        resultsSize: 0,
        resultsLast: null,
        resultsHistory: [],

        settings: {},

        url: '',
        urlHistory: [],

        increase: (by: number) =>
            set((state: { bears: number }) => ({ bears: state.bears + by })),
        updateResults: (payload: object) => {
            const results = {
                timestamp: new Date().toISOString(), // todo send in
                // @ts-expect-error todo typing
                size: payload?.jobResults?.length || 0,
                jobIds:
                    // @ts-expect-error todo typing
                    payload?.jobResults?.map(
                        (j: { jobId: string }) => j.jobId
                    ) || [],
            };
            console.log('results', results);

            // @ts-expect-error ugh
            const transformedJobs = transformJobs(payload?.jobResults || []);
            set((state: { resultsHistory: ResultsData[] }) => ({
                results: transformedJobs,
                // resultsData: displayJobs.data.source,
                resultsHistory: [...state.resultsHistory, results],
                resultsSize: results.size,
                resultsLast: results,
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
