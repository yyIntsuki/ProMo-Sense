import AboutView from "../views/aboutView";
import { auth, provider, signInWithPopup, signOut } from "../firebaseModel";

export default function About(props) {
    function handleLoginACB() {
        console.log(props);

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Sign In User: ");
                console.log(result);

                const user = result.user;
                props.props.UserState.user = user;
                props.props.UserState.loginStatus = true;
                console.log("LogIn successfully");
            })
            .catch((error) => { console.error(error); });
    }

    function handleLogoutACB() {
        signOut(auth)
            .then(() => {
                props.props.UserState.loginStatus = false;
                props.props.UserState.user = null;
                console.log("LogOut successfully");
            })
            .catch((error) => { console.error(error); });
    }

    return (
        <div>
            <div>
                {/* UNDEFINED NAVBARVIEW */}
                {/* <NavbarView user={props.props.UserState.user} loginStatus={props.props.UserState.loginStatus} setLoginStatus={handleLoginACB} setLogoutStatus={handleLogoutACB} /> */}
            </div>
            <div>
                <AboutView />
            </div>
        </div>
    );
}
