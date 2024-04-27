import { useState, useEffect } from "react";
import { auth, database, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "../firebaseModel";
import { ref, set } from "firebase/database";

export default function Login() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    const [user, setUser] = useState(null);  // INGEN ANVÄNDARE I BÖRJAN


    
    function timeInSweden() { //funktion gör att det går o se vid vilken tid punkt i "svensk" tid en använadre har loggat in
        const timeNow = new Date();
        const swedishTime = timeNow.toLocaleString('sv-SE', {
            timeZone: 'Europe/Stockholm'
        });
    
        return swedishTime;
    }
    
    const lastLogin = timeInSweden ();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);  
            }
        });

        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    const newUser = result.user;
                    setUser(newUser);  // settar användare

                    //sparar data i firebase
                    const userRef = ref(database, 'users/' + newUser.uid);
                    return set(userRef, {
                        firstName: newUser.displayName?.split(" ")[0],
                        lastName: newUser.displayName?.split(" ")[1],
                        email: newUser.email,
                        lastLogin: timeInSweden()
                    });
                }
            })
            .catch((error) => {
                console.error("Error occurred when redirecting:", error.message);
            });

        
        
    }, []);

    function handleLogin(event) {
        event.preventDefault();
        signInWithRedirect(auth, provider);
    }

    function handleSignOut(event) {
        event.preventDefault();
        signOut(auth).then(() => {
            setUser(null);  //ingen använadre 
            console.log("User signed out successfully");
        }).catch((error) => {
            console.error("Error when signing out:", error);
        });
    }


    return (
        <div className="login_wrapper">
            {user ? (
                <>
                    <h2>Welcome, {user.displayName}</h2> 
                    <h1 onClick={handleSignOut}>Sign Out</h1>
                </>
            ) : (
                <h1 onClick={handleLogin}>Log in with Google</h1>
            )}
        </div>
    );
}