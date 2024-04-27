import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { getDatabase } from "firebase/database";

initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

export { auth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, database, onAuthStateChanged }