import useStore from '../../../store/store.ts';

export const Request = () => {
    const searchId = useStore((state) => state.searchId);
    const request = useStore((state) => state.request);
    const requestEntries = Object.entries(request);
    const context = useStore((state) => state.context);
    const contextEntries = Object.entries(context);
    return (
        <>
            <h3>Request info</h3>
            {searchId &&
                requestEntries.map((entry) => (
                    <>
                        {entry[0]}: {entry[1]}
                        <br />
                    </>
                ))}
            <h3>App context</h3>
            {contextEntries &&
                contextEntries.map((entry) => (
                    <>
                        {entry[0]}: {entry[1]}
                        <br />
                    </>
                ))}
        </>
    );
};
