import './Popup.css';

import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import SignInSignOutButton from '../../auth/ui-components/SignInSignOutButton.tsx';

const Popup = ({
    msalInstance,
}: {
    msalInstance: PublicClientApplication;
}): JSX.Element => {
    return (
        <MsalProvider instance={msalInstance}>
            <div className="card">
                <p>Monster Job Search Extension</p>
                <SignInSignOutButton />
            </div>
        </MsalProvider>
    );
};

export default Popup;
