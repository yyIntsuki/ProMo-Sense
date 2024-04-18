import AboutView from "../views/aboutView";
import { observer } from "mobx-react-lite";
// import { auth } from "../firebaseModel"; // UNDEFINED
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default observer(function About(props) {
	function handleLoginACB() {
		console.log(props);

		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log("Sign In User: ");
				console.log(result);

				const user = result.user;
				props.props.UserState.user = user;
				props.props.UserState.loginStatus = true;
				console.log("LogIn successfully");
			})
			.catch((error) => { });
	}

	function handleLogoutACB() {
		signOut(auth)
			.then(() => {
				props.props.UserState.loginStatus = false;
				props.props.UserState.user = null;
				console.log("LogOut successfully");
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div>
			<div>
				{/* UNDEFINED NAVBARVIEW */}
				{/* <NavbarView user={props.props.UserState.user} loginStatus={props.props.UserState.loginStatus} setLoginStatus={handleLoginACB} setLogoutStatus={handleLogoutACB} /> */}
			</div>
			<div>
				<AboutView></AboutView>
			</div>
		</div>
	);
});
