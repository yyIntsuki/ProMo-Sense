import { useState } from "react";
import { auth, provider } from "../firebaseModel";
import { signInWithPopup } from "firebase/auth";

export default function LogIn() {
  const [user, setUser] = useState("");

  const whenToLogIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error("An error has occurred during login:", error);
      });
  };

  return (
    <div className="logga in">
      <form onSubmit={whenToLogIn}>
        <h1>Log in</h1>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
