// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// due to MSAL not working with v3 chrome extensions, using oidc-client-ts instead
// see https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/3923
// this code from sample: https://github.com/Alino/OIDC-client-ts-chromium-sample
// todo - refactor oidc code

import * as oidc from 'oidc-client-ts';

// microsoft app registration
// https://learn.microsoft.com/en-us/entra/identity-platform/scenario-spa-app-registration

const tenant = '4d9268cd-b286-4d81-9a28-f9ee90fd67c3';
const clientId = '67cb8bd6-d64f-4a7e-b519-fc30fb46c12b';

const url = 'https://flklggaomooblmlbbiiadbfmjembkkih.chromiumapp.org/';
const redirectUri = chrome.identity.getRedirectURL();
if (url !== redirectUri) {
    console.error('redirect uri does not match');
}

const settings = {
    authority: `https://login.microsoftonline.com/${tenant}/`,
    client_id: clientId,
    redirect_uri: redirectUri,
    post_logout_redirect_uri: redirectUri,

    response_type: 'code',
    response_mode: 'fragment',
    // scope: "openid email roles",

    silent_redirect_uri: redirectUri,
    automaticSilentRenew: true,
    //silentRequestTimeout: 10000,

    filterProtocolClaims: true,
};

oidc.Log.setLogger(console);
oidc.Log.setLevel(oidc.Log.INFO);

const mgr = new oidc.UserManager(settings);
const client = mgr._client;
globalThis.mgr = mgr;

function log() {
    console.log(...arguments);
}

///////////////////////////////
// events
///////////////////////////////
mgr.events.addAccessTokenExpiring(function () {
    console.log('token expiring');
    log('token expiring');
});

mgr.events.addAccessTokenExpired(function () {
    log('token expired');
    /**
     * the line below was not tested if it actually regains the token
     * because the token is automatically renewed using settings param "automaticSilentRenew: true"
     * just before it expires.
     */
    client.useRefreshToken();
});

mgr.events.addSilentRenewError(function (e) {
    console.log('silent renew error', e.message);
    log('silent renew error', e.message);
});

mgr.events.addUserLoaded(function (user) {
    console.log('user loaded', user);
    mgr.getUser().then(
        function () {
            console.log('getUser loaded user after userLoaded event fired');
        },
        () => {}
    );
});

mgr.events.addUserUnloaded(function (e) {
    console.log('user unloaded');
});

///////////////////////////////
// functions for UI elements
///////////////////////////////

/**
 * Generates a login url
 */
async function getLoginUrl(request, reject) {
    return new Promise((resolve) => {
        return client
            .createSigninRequest({})
            .then(function (req) {
                log(
                    'signin request',
                    req,
                    "<a href='" + req.url + "'>go signin</a>"
                );
                resolve(req.url);
            })
            .catch(function (err) {
                console.error(err);
                log(err);
                reject();
            });
    });
}

/**
 * Generates a logout url
 */
async function getLogoutUrl(request) {
    return new Promise((resolve, reject) => {
        return client
            .createSignoutRequest({})
            .then(function (req) {
                log(
                    'signout request',
                    req,
                    "<a href='" + req.url + "'>go signout</a>"
                );
                resolve(req.url);
            })
            .catch(function (err) {
                console.error(err);
                log(err);
                reject();
            });
    });
}

/**
 * Launch the Chromium web auth UI.
 * @param {*} url AAD url to navigate to.
 * @param {*} interactive Whether or not the flow is interactive
 */
async function launchWebAuthFlow(url) {
    return new Promise((resolve, reject) => {
        chrome.identity.launchWebAuthFlow(
            {
                interactive: true,
                url,
            },
            (responseUrl) => {
                // Response urls includes a hash (login, acquire token calls)
                if (responseUrl.includes('#')) {
                    client
                        .processSigninResponse(responseUrl)
                        .then((user) => {
                            console.log('processSigninResponse: ', user);
                            // todo - check for user in localstorage and store user when launching the app
                            mgr.storeUser(new oidc.User(user));
                            resolve(user);
                        })
                        .catch((err) => {
                            console.error(err);
                            reject();
                        });
                } else {
                    // Logout calls
                    resolve();
                }
            }
        );
    });
}

/**
 * EXPOSE signIn and signOut methods globally
 * this enables you to try it from the dev tools console
 * of the service worker
 **/
globalThis.signIn = async function () {
    const url = await getLoginUrl();
    const result = await launchWebAuthFlow(url);
    console.log('globalThis.signIn result:', result);
    return result;
};

globalThis.signOut = async function () {
    const logoutUrl = await getLogoutUrl();
    mgr.removeUser();
    await launchWebAuthFlow(logoutUrl);
};

/**
 * Returns the user signed into the service worker.
 */
globalThis.getSignedInUser = async function () {
    return new Promise((resolve, reject) => {
        try {
            /**
             *  NOTE: this disabled code somehow works with MSAL but not with OIDC.
             *  It is supposed to use some chrome token cache. But with OIDC it does not store it...
             *  So we are loading the user using oidc mgr manually.
             */
            // chrome.identity.getProfileUserInfo((user) => {
            //     console.log("user:", user);
            //     if (user) {
            //         resolve(user);
            //     } else {
            //         resolve(null);
            //     }
            // });
            mgr._loadUser()
                .then((user) => {
                    console.log('user: ', user);
                    if (user) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                })
                .catch((err) => {
                    throw err;
                });
        } catch (err) {
            console.error(err);
            reject();
        }
    });
};
