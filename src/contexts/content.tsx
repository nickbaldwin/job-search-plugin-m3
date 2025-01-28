import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../components/content/App.tsx';
import { log } from '../utils/logger.ts';

// listen to messages from the world script and update the store
import { ListenerFunction } from '../components/content/scripts/resultsListenerFunction.ts';
ListenerFunction();

const moduleName = 'content script';
log({ logType: 'info', moduleName, message: 'loaded' });

// note that world script is now injected directly into the host web page
// within the 'main' world context (via manifest.json)
// whereas this script is rendered within the web page in an 'isolated' context
// thus the world script has access to the context of the app, and can communicate
// with this script, which is listening for messages and updates the store

const root: HTMLDivElement = document.createElement('div');
root.id = 'content-root';
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// listen to messages from the background script and update the store
import { settingsListenerFunction } from '../components/content/scripts/settingsListenerFunction.ts';
settingsListenerFunction();
