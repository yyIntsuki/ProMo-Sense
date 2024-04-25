import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut }