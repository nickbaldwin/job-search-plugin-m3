import useStore from '../../../store/store.ts';
import { ResultsTable } from './ResultsTable.tsx';

import { Table } from './Table.tsx';

export const Results = () => {
    const resultsSize = useStore((state) => state.resultsSize);
    const results = useStore((state) => state.results);

    return (
        <>
            <p>There are {resultsSize} results</p>
            <ResultsTable results={results} />
            <br /> <br />
            <Table />
        </>
    );
};
