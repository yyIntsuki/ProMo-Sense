
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import firebaseConfig from "./firebaseConfig";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

async function getAudioFiles(userId) {
    const audioListRef = storageRef(storage, `user_files/${userId}/`);
    try {
        const result = await listAll(audioListRef);
        const fileUrls = await Promise.all(result.items.map(item => getDownloadURL(item)));
        return fileUrls;
    } catch (error) {
        console.error("Failed to fetch audio files:", error);
        return [];
    }
}

async function uploadFile(file, userId) {
    const fileRef = storageRef(storage, `user_files/${userId}/${file.name}`);
    try {
        const snapshot = await uploadBytes(fileRef, file);
        console.log('File uploaded successfully!', snapshot);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

async function setUserInDatabase(user) {
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

async function getVolumeFromDatabase() {
    const volumeRef = ref(database, "data/audio_module/volume");
    try {
        const snapshot = await get(volumeRef);
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error("Failed to fetch volume:", error);
    }
}

async function setVolumeInDatabase(volume) {
    const volumeRef = ref(database, "data/audio_module/volume");
    try {
        await set(volumeRef, volume);
        console.log("Volume saved to database:", volume);
    } catch (error) {
        console.error("Failed to set volume:", error);
    }
}

export { auth, provider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged, uploadFile, setUserInDatabase, getVolumeFromDatabase, setVolumeInDatabase, getAudioFiles };
