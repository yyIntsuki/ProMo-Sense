import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import firebaseConfig from "./firebaseConfig";

initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

/* User authentication */
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

function setUserInDatabase(user) {
    function currentTimeInSweden() {
        const timeNow = new Date();
        return timeNow.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" });
    }

    const userRef = ref(database, "users/" + user.uid);
    return set(userRef, {
        firstName: user.displayName?.split(" ")[0],
        email: user.email,
        lastLogin: currentTimeInSweden()
    });
}

/* Audio module */
const volumeRef = ref(database, "data/audio_module/volume");

async function getVolumeFromDatabase() {
    let value;
    await get(volumeRef)
        .then((snapshot) => { if (snapshot.exists()) { value = snapshot.val(); } })
        .catch((error) => { console.error("Failed to fetch volume:", error); })
    return value;
}

async function setVolumeInDatabase(volume) {
    await set(volumeRef, volume)
        .then(() => { console.log("Volume saved to database:", volume); })
        .catch((error) => { console.error("Failed to set volume:", error); });
}

export { auth, onAuthStateChanged, provider, signInWithRedirect, getRedirectResult, signOut, setUserInDatabase, getVolumeFromDatabase, setVolumeInDatabase, database, get, ref }