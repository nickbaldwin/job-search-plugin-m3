import { SignInButton } from './SignInButton';


const SignInSignOutButton = () => {


    /*
    if (isAuthenticated) {
        return <SignOutButton />;
    } else if (inProgress !== InteractionStatus.Startup && inProgress !== InteractionStatus.HandleRedirect) {
        // inProgress check prevents sign-in button from being displayed briefly after returning from a redirect sign-in. Processing the server response takes a render cycle or two
        return <SignInButton />;
    } else {
        return null;
    }

     */
    return (
        <div>
            <SignInButton />
        </div>
    );
};

export default SignInSignOutButton;
