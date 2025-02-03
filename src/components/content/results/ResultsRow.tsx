import { DisplayJob } from '../../../schema/displayJob.ts';

export const ResultRow = ({
    result,
    propertiesToDisplay,
}: {
    result: DisplayJob;
    propertiesToDisplay: string[];
}) => {
    // @ts-expect-error todo
    const fields = propertiesToDisplay.map((p) => result[p]);
    return (
        <tr key={result.jobId}>
            {fields.map((field) => (
                <td> {field} </td>
            ))}
        </tr>
    );
};
