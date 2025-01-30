import { defaultUserSetting } from '../schema/settings.ts';
// todo - use logger, DataProperty, zod
const settingsKey = 'job-search-plugin-field-settings-old';

export const getSettingsFromExtensionStorage = async (): Promise<object> => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get([settingsKey], function (value: object) {
                // @ts-expect-error todo
                if (
                    !value ||
                    value[settingsKey] === undefined ||
                    Object.entries(value[settingsKey]).length === 0
                ) {
                    // todo - save default settings
                    console.log(
                        `no store with key ${settingsKey} in extension storage`,
                        value
                    );
                    const settings = { ...defaultUserSetting() };
                    console.log(
                        'no saved settings. going to use and save default settings',
                        settings
                    );

                    const saveSuccess =
                        saveSettingsToExtensionStorage(settings);
                    console.log('saveSuccess?: ', saveSuccess);
                    resolve(settings);
                    // reject();
                } else {
                    // @ts-expect-error todo
                    resolve(value[settingsKey]);
                }
            });
        } catch (err) {
            console.log('err - caught');
            reject(err);
        }
    });
};

export const saveSettingsToExtensionStorage = async (settings: object) => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set({ [settingsKey]: settings }, function () {
                resolve('settings saved');
            });
        } catch (ex) {
            reject(ex);
        }
    });
};

export const saveSettingToExtensionStorage = async (settings: object) => {
    return new Promise((resolve, reject) => {
        try {
            saveSettingsToExtensionStorage(settings);
        } catch (ex) {
            reject(ex);
        }
    });
};

export const removeObjectFromLocalStorage = async () => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.remove([settingsKey], function () {
                resolve('cleared');
            });
        } catch (ex) {
            reject(ex);
        }
    });
};

// todo - review

/*
export const getSavedSettings = () => {

    console.log('current plugin version is: ', currentVersion.version);
    let useDefault = false;
    let updated = false;
    let store = loadStore();

    if (!store || !store.version ) {
        console.log('you do not have any saved settings - using default settings');
        useDefault = true;
        updated = true;
    }

    else if (store.version !== currentVersion.version && !canMigrate(store.version)) {
        console.log('your saved settings are for version ' +  store?.version || 'unknown');
        console.log('updated settings to defaults for version ' + currentVersion.version);
        useDefault = true;
    }
    else if (store.version !== currentVersion.version && canMigrate(store.version)) {
        console.log('your saved settings are for version ' +  store?.version);
        console.log('migrating settings to version ' + currentVersion.version);
        store = migrate(store, store.version);
        updated = true;
    }

    if (useDefault) {
        store = defaultUserSettings;
        updated = true;
    }

    if (!isValidUserSettings(store)) {
        console.log('your settings are invalid. updated settings to defaults for version ' + currentVersion.version);
        store = defaultUserSettings;
        updated = true;
    }

    if (updated) {
        saveStore(store);
    }

    return store;
}



export const saveSettings = (store: object) => {
    saveStore(store);
}















// todo - WIP

interface Store {
    [key: string]: UserSettings;
}

 */

// todo - use settings type
