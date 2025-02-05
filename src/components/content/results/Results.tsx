import useStore from '../../../store/store.ts';

import { Table } from './Table.tsx';

export const Results = () => {
    const resultsSize = useStore((state) => state.resultsSize);
    const searchId = useStore((state) => state.searchId);
    const fingerprintId = useStore((state) => state.fingerprintId);
    const results = useStore((state) => state.results);
    const settings = useStore((state) => state.settings);
    const estimatedTotalSize = useStore(
        (state) => state.resultsEstimatedTotalSize
    );

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
            <p>Search id: {searchId} </p>
            <p>Fingerprint id: {fingerprintId} </p>
            <p>Estimated total size: {estimatedTotalSize} </p>
            <Table results={results} hiddenSettings={hiddenSettings} />
        </>
    );
};
