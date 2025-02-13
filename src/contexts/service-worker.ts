// todo - workaround for oidc not supporting chrome.storage API as a cache option
import '../oidc/jsdom-min.js';
import '../oidc/bg-initMocks.ts';
import '../oidc/bg-auth.ts';

import { log } from '../utils/logger.ts';
import {
    MessageType,
    subscribeToExtensionMessages,
    sendMessageToContent,
} from '../utils/messaging.ts';
import {
    getSettingsFromExtensionStorage,
    saveSettingsToExtensionStorage,
    saveSettingToExtensionStorage,
} from '../helpers/localStorage.ts';
import { getNamesOfFields } from '../schema/settings.ts';

try {
    const moduleName = 'background service-worker script';
    log({ logType: 'info', moduleName, message: 'loaded' });

    const handleMessage = async (message: MessageType) => {
        log({ logType: 'MESSAGE_RECEIVED', moduleName, payload: message });

        // todo
        if (message.type === 'SAVED_SETTINGS_REQUEST') {
            const settings = await getSettingsFromExtensionStorage();
            sendMessageToContent({
                type: 'SAVED_SETTINGS',
                payload: settings,
            });
        }

        if (message.type === 'COOKIE_REQUEST') {
            console.log('check for cookie');

            // todo - pass in the url (from content script) to get the cookie from
            chrome.cookies.getAll({ name: 'jaType' }, function (cookies) {
                cookies.forEach((cookie) => {
                    if (cookie.name === 'jaType') {
                        sendMessageToContent({
                            type: 'COOKIE_SET',
                            payload: cookie,
                        });
                    }
                });
            });
        }

        if (message.type === 'TOGGLE_SETTING_VISIBILITY') {
            // todo - move logic to storage / settings
            const currentSettings = await getSettingsFromExtensionStorage();
            // todo
            if (
                typeof message.payload !== 'string' ||
                !getNamesOfFields().includes(message.payload)
            ) {
                log({
                    logType: 'error',
                    moduleName: 'service-worker',
                    error: 'error saving settings',
                    payload: {
                        error: `setting ${message.payload} not in list of fields`,
                    },
                });
                return;
            }
            const setting = currentSettings[message.payload];
            const newSetting = {
                ...setting,
                visible: !setting.visible,
            };

            const updated = {
                ...currentSettings,
                // @ts-ignore
                [message.payload]: newSetting,
            };

            const status = await saveSettingsToExtensionStorage(updated);
            if (status === 'SUCCESS') {
                console.log('updated settings ', updated);
                sendMessageToContent({
                    type: 'SAVED_SETTINGS',
                    payload: updated,
                });
            } else {
                log({
                    logType: 'error',
                    moduleName: 'service-worker',
                    error: 'error saving settings',
                    payload: { status: status },
                });
            }
        }
    };

    subscribeToExtensionMessages(handleMessage, moduleName);
} catch (e) {
    log({
        logType: 'error',
        moduleName: 'service-worker',
        error: 'error',
        payload: e || {},
    });
}

// todo
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.executeFn === 'signIn') {
        console.log('sign in');
    } else if (request.executeFn === 'signOut') {
        console.log('sign out');
    } else if (request.executeFn === 'getSignedInUser') {
        console.log('get user');
        globalThis.getSignedInUser().then((user) => {
            console.log('USERRERERER', user);
            sendResponse(user);
        });
    }

    return true; // must return true for async listeneres
});

// todo - note this matches the expected id for the extension (and the old version)
const i = chrome.identity.getRedirectURL();
console.log('identity url', i);
