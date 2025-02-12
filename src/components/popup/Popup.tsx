import './Popup.css';

import { useEffect } from 'react';

const Popup = (): JSX.Element => {
    const handleSignIn = (event) => {
        console.log('signin clicked!');
        chrome.runtime.sendMessage({ executeFn: 'signIn' }, (response) => {
            console.log('response from signin', response);
            console.log(response?.profile?.upn);
        });
    };

    const handleSignOut = (event) => {
        console.log('signout clicked!');
        chrome.runtime.sendMessage({ executeFn: 'signOut' }, (response) => {
            console.log('response from signout', response);
            console.log(response?.profile?.upn);
        });
    };

    // todo - user state
    useEffect(() => {
        chrome.runtime.sendMessage(
            { executeFn: 'getSignedInUser' },
            (response) => {
                console.log(response.profile.upn);
            }
        );
    }, []);

    return (
        <div className="card">
            <p>Monster Job Search Extension</p>
            <div>
                <h2>Actions</h2>
                <button id="sign-in" onClick={handleSignIn}>
                    Sign In
                </button>
                <button id="sign-in-hint" className="hidden"></button>
                <button id="sign-out" onClick={handleSignOut}>
                    Sign Out
                </button>

                <h2>Signed In User</h2>
                <dl>
                    <dt>Username:</dt>
                    <dd id="username"></dd>

                    <dt>Display name:</dt>
                    <dd id="displayname"></dd>
                </dl>
            </div>
        </div>
    );
};

export default Popup;
