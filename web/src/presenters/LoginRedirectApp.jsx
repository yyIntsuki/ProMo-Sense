import { useState, useEffect } from "react";
import { auth, provider, GoogleAuthProvider } from "../firebaseModel";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";

export default function LogInForApp() {
    const [user, setUser] = useState();

    useEffect(() => {
        getRedirectResult(auth)
        .then((result) => {
            if (result) {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                setUser(result.user);
            }
        })
        .catch((error) => {
            console.error("Error has occured during redirecting:", error.message);
        });
    }, []);

    function handleLogin(event) {
        event.preventDefault();
        signInWithRedirect(auth, provider);
    }

    return (
        <div className="login_wrapper">
            <h1 onClick={handleLogin}>Log in with Google</h1>
        </div>
    );
}
