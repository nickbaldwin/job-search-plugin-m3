import {
    defaultUserSetting,
    getNamesOfFields,
    UserSettings,
} from '../schema/settings.ts';

// todo - use logger, DataProperty, zod
// todo - update key
const settingsKey = 'job-search-plugin-field-settings-old';

// todo type
export const getSettingsFromExtensionStorage: () => Promise<UserSettings> =
    async (): Promise<UserSettings> => {
        return (
            chrome.storage.local
                .get([settingsKey])
                // todo - tidy/extract
                .then((value) => {
                    // make sure we have valid settings
                    if (
                        !value ||
                        value[settingsKey] === undefined ||
                        Object.keys(value[settingsKey]).length === 0 ||
                        Object.keys(value[settingsKey]).filter(
                            (i) => !getNamesOfFields().includes(i)
                        ).length > 0 ||
                        getNamesOfFields().filter((i) => !value[settingsKey][i])
                            .length > 0
                    ) {
                        console.log(
                            `no store with key ${settingsKey} in extension storage`,
                            value
                        );
                        const settings = { ...defaultUserSetting() };
                        console.log(
                            'no valid saved settings. going to use and save default settings',
                            settings
                        );
                        const saveSuccess =
                            saveSettingsToExtensionStorage(settings);
                        console.log('saveSuccess?: ', saveSuccess);
                        return settings;
                    } else {
                        // todo - check
                        return value[settingsKey]; // as UserSettings;
                    }
                })
                .catch((err) => {
                    console.log('err: ', err);
                    return { ...defaultUserSetting() };
                })
        );
    };

export const saveSettingsToExtensionStorage = async (settings: object) => {
    return chrome.storage.local
        .set({ [settingsKey]: settings })
        .then(() => {
            console.log('saved settings');
            return 'SUCCESS';
        })
        .catch((ex) => {
            return 'ERROR';
        });
};

// todo
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



 */
