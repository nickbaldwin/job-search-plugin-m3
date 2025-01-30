import useStore from '../../../store/store.ts';

import { Table } from './Table.tsx';

export const Results = () => {
    const resultsSize = useStore((state) => state.resultsSize);
    const results = useStore((state) => state.results);
    const settings = useStore((state) => state.settings);

    const visibleSettings = Object.keys(settings).filter(
        (s) => !settings[s].visible
    );
    const hiddenSettings = Object.fromEntries(
        visibleSettings.map((value) => [value, false])
    );
    console.log('visible settings', visibleSettings);

    return (
        <>
            <p>There are {resultsSize} results</p>

            <Table results={results} hiddenSettings={hiddenSettings} />
        </>
    );
};
