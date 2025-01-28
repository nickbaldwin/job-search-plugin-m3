import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../components/content/App.tsx';
import { log } from '../utils/logger.ts';

// listen to messages from the world script and update the store
import { ListenerFunction } from '../components/content/scripts/resultsListenerFunction.ts';
ListenerFunction();

const moduleName = 'content script';
log({ logType: 'info', moduleName, message: 'loaded' });

// not that world script is now injected directly into the host web page
// - within 'main' world context

// render the app into the host web page
// - isolated context
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
