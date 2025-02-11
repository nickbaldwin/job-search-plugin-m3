import { useMsal } from '@azure/msal-react';
import { Button } from '@headlessui/react';

import { sendMessageToContent } from '../../utils/messaging.ts';

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLoginRedirect = async () => {
        async function getLoginUrl(request) {
            return new Promise((resolve, reject) => {
                instance
                    .loginRedirect({
                        ...request,
                        onRedirectNavigate: (url) => {
                            console.log(url);
                            resolve(url);
                            return false;
                        },
                    })
                    .catch(reject);
            });
        }

        async function launchWebAuthFlow(url) {
            return new Promise((resolve, reject) => {
                chrome.identity.launchWebAuthFlow(
                    {
                        interactive: true,
                        url,
                    },
                    (responseUrl) => {
                        // Response urls includes a hash (login, acquire token calls)
                        console.log('responseUrl', responseUrl);

                        if (responseUrl.includes('#')) {
                            instance
                                .handleRedirectPromise(
                                    `#${responseUrl.split('#')[1]}`
                                )
                                .then(resolve)
                                .catch(reject);
                        } else {
                            // Logout calls
                            resolve();
                        }
                    }
                );
            });
        }

        getLoginUrl({}).then((loginUrl) => {
            launchWebAuthFlow(loginUrl)
                .then((loginResult) => {
                    console.log(loginResult);
                    sendMessageToContent({
                        type: 'MSAL_LOGIN_SUCCESS',
                        // @ts-ignore
                        payload: { loginResult },
                    });
                    chrome.storage.local.set({ msalLoginResult: loginResult });
                    //msalInstance.loginRedirect(loginRequest);
                    return true;
                })
                .catch((error) => {
                    console.error(error);
                    sendMessageToContent({
                        type: 'MSAL_LOGIN_FAILURE',
                        payload: { error },
                    });
                });
        });
    };

    return (
        <div>
            <Button onClick={handleLoginRedirect} color="inherit">
                Login
            </Button>
        </div>
    );
};
