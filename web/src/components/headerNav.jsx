import '../css/common.css';
import '../css/components.css';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged, provider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, setUserInDatabase, setActiveUserOnDatabase } from '../firebaseModel';
import { UserContext } from '../contexts/userContext';

export default function Header() {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        /* Observing authentication status */
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setActiveUserOnDatabase(user);
            }
            else { setCurrentUser(null); }
        });
        /* Gets result from logging in by redirect */
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    const { user } = result;
                    setCurrentUser(user);
                    setUserInDatabase(user);
                }
            })
            .catch((error) => { console.error('Error occurred when redirecting:', error.message); })
    }, [setCurrentUser]);

    const navigate = useNavigate();
    function navigateToApp() { navigate('/'); }

    function handleLogin(event) {
        event.preventDefault();
        /* For handling development as redirect fails to work due to third party cookies */
        switch (window.location.hostname) {
            case 'localhost': signInWithPopup(auth, provider); break;
            default: signInWithRedirect(auth, provider); break;
        }
    }

    function handleLogout(event) {
        event.preventDefault();
        signOut(auth)
            .then(() => { setCurrentUser(null); })
            .catch((error) => { console.error('Error when signing out:', error); });
    }

    return (
        <div className='header_wrapper'>
            <div className='title'>
                <h1 onClick={navigateToApp}>ProMo-Sense</h1>
                <small><i>Safeguarding your space, at home or away</i></small>
            </div>

            {currentUser ?
                <div className='user'>
                    <h1 onClick={handleLogout}>Log out</h1>
                    <small>logged in as {currentUser.displayName}</small>
                </div>
                :
                <div className='user'>
                    <h1 onClick={handleLogin}>Login</h1>
                    <small>with Google</small>
                </div>
            }
        </div>
    )
}
