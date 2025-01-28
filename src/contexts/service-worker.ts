import { log } from '../utils/logger.ts';
import {
    MessageType,
    subscribeToExtensionMessages,
    sendMessageToContent,
} from '../utils/messaging.ts';
import { getSettingsFromExtensionStorage } from '../helpers/localStorage.ts';

try {
    const moduleName = 'background service-worker script';
    log({ logType: 'info', moduleName, message: 'loaded' });

    const handleMessage = async (message: MessageType) => {
        log({ logType: 'MESSAGE_RECEIVED', moduleName, payload: message });

        // todo
        if (message.type === 'SAVED_SETTINGS_REQUEST') {
            console.log('check for settings');
            const settings = await getSettingsFromExtensionStorage();
            console.log('settings', settings);
            sendMessageToContent({
                type: 'SAVED_SETTINGS',
                payload: settings,
            });
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
