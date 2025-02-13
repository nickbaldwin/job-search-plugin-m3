import useStore from '../../../store/store.ts';
import { useEffect } from 'react';

export const Auth = (): JSX.Element => {
    const isAuth = useStore((state) => state.isAuth);
    const updateAuth = useStore((state) => state.updateAuth);
    const username = useStore((state) => state.username);
    const updateUsername = useStore((state) => state.updateUsername);

    const handleSignIn = () => {
        console.log('signin clicked!');
        chrome.runtime.sendMessage({ executeFn: 'signIn' }, (response) => {
            console.log('response from signin', response);
            console.log(response?.profile?.upn);
        });
    };

    const handleSignOut = () => {
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
                const isAuth = !!response.profile;
                const username = isAuth ? response.profile.name : '';

                updateAuth(isAuth);
                updateUsername(username);
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

                <h2>Signed In? {isAuth ? 'yes' : 'no'}</h2>
                <p>username: {isAuth ? username : ''}</p>
            </div>
        </div>
    );
};
