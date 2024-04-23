import React, { useState } from "react"; // Import useState from React
import { auth, provider } from "../firebaseModel";
import { signInWithPopup } from "firebase/auth";

const LogIn = () => {
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
};

export default LogIn;
