import { useState } from "react";
import { auth, provider } from "../firebaseModel";
import { signInWithPopup } from "firebase/auth";

export default function LogIn() {
  const [user, setUser] = useState();

  async function handleLogin(event) {
    event.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error("An error has occurred during login:", error);
      });
  }

  return (
    <div className="login_wrapper">
      <h1 onClick={handleLogin}>Log in with Google</h1>
    </div>
  )
}
