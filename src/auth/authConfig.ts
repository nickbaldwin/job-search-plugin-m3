import { Configuration, LogLevel, PopupRequest } from '@azure/msal-browser';

const redirectUri = 'https://flklggaomooblmlbbiiadbfmjembkkih.chromiumapp.org/';

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        authority:
            'https://login.microsoftonline.com/4d9268cd-b286-4d81-9a28-f9ee90fd67c3/',
        clientId: '67cb8bd6-d64f-4a7e-b519-fc30fb46c12b',
        redirectUri: redirectUri,
        postLogoutRedirectUri: redirectUri,
    },

    // cache: {
    // used for multi-tab support
    // cacheLocation: 'localStorage', // This configures where your cache will be stored
    // storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    //},
    system: {
        allowPlatformBroker: true,
        loggerOptions: {
            // @ts-ignore
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
    // system: { allowPlatformBroker: false },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ['User.Read'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
