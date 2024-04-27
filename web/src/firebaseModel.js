import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from "./firebaseConfig";

initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

export { auth, onAuthStateChanged, provider, signInWithRedirect, getRedirectResult, signOut, database, ref, set }