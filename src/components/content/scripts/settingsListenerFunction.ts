import useStore from '../../../store/store.ts';
import {
    MessageType,
    sendMessageToBackgroundAndPopup,
    subscribeToExtensionMessages,
} from '../../../utils/messaging.ts';

import { log } from '../../../utils/logger.ts';
const moduleName = 'settingsListener';

const updateSettings = useStore.getState().updateSettings;
const updateCookieValue = useStore.getState().updateCookieValue;

export const settingsListenerFunction = () => {
    log({ logType: 'info', moduleName, message: 'loaded' });
    const messageHandler = (messageType: MessageType) => {
        if (messageType.type === 'SAVED_SETTINGS') {
            log({
                logType: 'info',
                moduleName,
                fn: 'message handler',
                message: `${messageType.type} message received`,
                payload: { payload: messageType.payload },
            });

            console.log('update settings here');
            // todo
            updateSettings(messageType.payload);
            console.log(window.location.href);
        }

        if (messageType.type === 'COOKIE_SET') {
            log({
                logType: 'info',
                moduleName,
                fn: 'message handler',
                message: `${messageType.type} message received`,
                payload: { payload: messageType.payload },
            });

            if (
                messageType.payload &&
                // @ts-ignore
                window.location.host.match(messageType.payload?.domain)
            ) {
                console.log('update cookie here');
                // @ts-ignore
                updateCookieValue(messageType.payload.value);
            }
        }

        // todo - unset cookie
    };
    subscribeToExtensionMessages(messageHandler, moduleName);

    // todo
    sendMessageToBackgroundAndPopup({
        type: 'VERSION_REQUEST',
        source: moduleName,
    });

    sendMessageToBackgroundAndPopup({
        type: 'SAVED_SETTINGS_REQUEST',
        source: moduleName,
    });

    // todo
    sendMessageToBackgroundAndPopup({
        type: 'LOGIN_STATUS_REQUEST',
        source: moduleName,
    });

    // todo
    sendMessageToBackgroundAndPopup({
        type: 'COOKIE_REQUEST',
        source: moduleName,
        payload: { domain: 'monster.com' },
    });
};
