import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from '../components/popup/Popup.tsx';
import { log } from '../utils/logger.ts';

import {
    PublicClientApplication,
    EventType,
    EventMessage,
    AuthenticationResult,
} from '@azure/msal-browser';
import { msalConfig } from '../auth/authConfig';
import { storage } from '../components/content/scripts/storage.ts';

export const msalInstance = new PublicClientApplication(msalConfig);

const moduleName = 'popup script';
log({ logType: 'info', moduleName, message: 'loaded' });
storage();

msalInstance.initialize().then(() => {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    const accounts = msalInstance.getAllAccounts();
    console.log('ACCOUNTS', accounts);
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
    }

    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            const account = payload.account;
            // msalInstance.setActiveAccount(account);
            console.log('account set', account.name);
        }
    });

    const root: HTMLElement | null = document.getElementById('popup-root');
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <Popup msalInstance={msalInstance} />
            </React.StrictMode>
        );
    }
});
