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

        if (message.type === 'TOGGLE_SETTING_VISIBILITY') {
            console.log('save setting');
            const currentSettings = await getSettingsFromExtensionStorage();
            console.log('current settings ', currentSettings);
            // @ts-ignore
            const setting =
                currentSettings[
                    typeof message.payload === 'string' ? message.payload : ''
                ];
            const newSetting = {
                ...setting,
                visible: !setting.visible,
            };

            const updated = {
                ...currentSettings,
                // @ts-ignore
                [message.payload]: newSetting,
            };
            console.log('updated settings ', updated);

            await saveSettingsToExtensionStorage(updated);

            sendMessageToContent({
                type: 'SAVED_SETTINGS',
                payload: updated,
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
