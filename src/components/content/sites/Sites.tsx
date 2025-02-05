import { Domains } from './Domains.tsx';

export const Sites = () => {
    return (
        <>
            <h3>Sites</h3>
            <p>Prod sites</p>
            <Domains env={'prod'} />
            <br />
            <p>Preprod sites</p>
            <Domains env={'preprod'} />
            <br />
            <p>Dev sites</p>
            <Domains env={'dev'} />
            <br />
        </>
    );
};
