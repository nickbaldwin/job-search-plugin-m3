import { DisplayJob } from '../../../schema/transform.ts';
import { ResultRow } from './ResultsRow.tsx';
// import { Job } from '../../schema/jobSchema.ts';
import { getNamesOfFields } from '../../../schema/settings.ts';

export const ResultsTable = ({ results }: { results: DisplayJob[] }) => {
    // todo - replace with selected fields only
    const fields = getNamesOfFields();

    return (
        <table>
            <thead>
                {fields.map((i) => (
                    <th> {i} </th>
                ))}
            </thead>
            <tbody>
                {results.map((r: DisplayJob) => (
                    <ResultRow result={r} propertiesToDisplay={fields} />
                ))}
            </tbody>
        </table>
    );
};
