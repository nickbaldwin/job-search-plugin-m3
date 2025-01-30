import useStore from '../../../store/store.ts';
import {
    MessageType,
    sendMessageToBackgroundAndPopup,
    subscribeToExtensionMessages,
} from '../../../utils/messaging.ts';

import { defaultUserSetting } from '../../../schema/settings.ts';

import { log } from '../../../utils/logger.ts';
const moduleName = 'settingsListener';

const updateSettings = useStore.getState().updateSettings;
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
        } else {
            // nothing!
        }
    };
    subscribeToExtensionMessages(messageHandler, moduleName);

    sendMessageToBackgroundAndPopup({
        type: 'VERSION_REQUEST',
        source: moduleName,
    });

    sendMessageToBackgroundAndPopup({
        type: 'SAVED_SETTINGS_REQUEST',
        source: moduleName,
    });

    sendMessageToBackgroundAndPopup({
        type: 'LOGIN_STATUS_REQUEST',
        source: moduleName,
    });
};
