// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// a workaround for oidc being dependent on global window object, and access to localStorage
// thus, need to mock the window object and localStorage
// todo - try removing jsdom and providing a simpler mock

const jsdom = new globalThis.jsdomModule.JSDOM();
jsdom.reconfigure({ url: chrome.identity.getRedirectURL() });

globalThis.window = jsdom.window;
globalThis.document = globalThis.window.document;

delete globalThis.window.localStorage;
delete globalThis.window.sessionStorage;

let storage = {};

chrome.storage.local.get(null).then((wholeStorage) => {
    storage = wholeStorage;
});

chrome.storage.onChanged.addListener((updatedStorage) => {
    Object.keys(updatedStorage).forEach((key) => {
        storage[key] = updatedStorage[key].newValue;
    });
});

// a workaround for oidc not supporting chrome.storage API as a cache option
globalThis.localStorage = {
    setItem: (key, value) => {
        console.log(`setting chrome.storage key ${key} with value ${value}`);
        chrome.storage.local.set({ [`localStorage-${key}`]: value });
    },
    getItem: (key) => {
        console.log(`getting chrome.storage key ${key}`);
        return storage[`localStorage-${key}`];
    },
    removeItem: (key) => {
        console.log(`removing chrome.storage key ${key}`);
        chrome.storage.local.remove([`localStorage-${key}`]);
    },
    clear: () => {
        console.log(`clearing chrome.storage`);
        chrome.storage.local.clear();
        storage = {};
    },
    getKeys: () => {
        console.log('customStorage getKeys()');
        var items = storage;
        var allKeys = Object.keys(items);
        console.log(allKeys);
        return allKeys;
    },
    containsKey(key) {
        console.log('customStorage containsKey()', key);
        return storage[key] !== undefined;
    },
};
globalThis.window.localStorage = {};
globalThis.window.localStorage = globalThis.localStorage;

globalThis.window.sessionStorage = {};
globalThis.window.sessionStorage = globalThis.localStorage;
