import { useState, useEffect } from "react";
import { auth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "../firebaseModel";

export default function Login() {
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState('');

    /* Runs once when user is back from redirect */
    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    setUser(result.user);
                }
            })
            .catch((error) => { console.error("Error has occured during redirecting:", error.message); });
    }, []);

    function handleLogin(event) {
        event.preventDefault();
        signInWithRedirect(auth, provider);
    }

    return (
        <div className="login_wrapper">
            <h1 onClick={handleLogin}>Log in with Google</h1>
        </div >
    )
}

