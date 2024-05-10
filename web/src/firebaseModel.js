import { initializeApp } from "firebase/app";
import {
    getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
    getRedirectResult, signOut, onAuthStateChanged
} from "firebase/auth";
import {
    getDatabase, ref, set, onValue
} from "firebase/database";
import {
    getStorage, ref as storageRef, uploadBytes, getDownloadURL, listAll
} from "firebase/storage";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

/* User authentication */
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

async function setUserInDatabase(user) {
    function currentTimeInSweden() {
        const timeNow = new Date();
        return timeNow.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" });
    }

    const userRef = ref(database, `users/${user.uid}`);
    return await set(userRef, {
        firstName: user.displayName?.split(" ")[0],
        email: user.email,
        lastLogin: currentTimeInSweden()
    });
}

async function setActiveUserOnDatabase(user) {
    const activeUserRef = ref(database, `users/active_user`);
    return await set(activeUserRef, { uid: user.uid });
}

/* Audio module */
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
        console.log("File uploaded successfully!", snapshot);
        alert("File uploaded successfully!");
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("File available at", downloadURL);
    } catch (error) { console.error("Error uploading file:", error); }
}

function onVolumeChange(callback) {
    const volumeRef = ref(database, "data/audio_module/volume");
    onValue(volumeRef, (snapshot) => {
        callback(snapshot.exists() ? snapshot.val() : null);
    }, (error) => {
        console.error("Failed to fetch volume:", error);
    });
}

function setVolumeInDatabase(volume) {
    const volumeRef = ref(database, "data/audio_module/volume");
    set(volumeRef, volume)
        .then(() => {
            alert(`Volume saved to database: ${Math.round(volume * 100)}%`);
        })
        .catch((error) => {
            console.error("Failed to set volume:", error);
        });
}

function onChosenAudioChange(callback) {
    const chosenAudioRef = ref(database, "data/audio_module/chosen_sound");
    onValue(chosenAudioRef, (snapshot) => {
        callback(snapshot.exists() ? snapshot.val() : null);
    }, (error) => {
        console.error("Failed to fetch chosen audio:", error);
    });
}

async function setChosenAudioFile(fileUrl) {
    const chosenAudioRef = ref(database, "data/audio_module/chosen_sound");
    try {
        await set(chosenAudioRef, fileUrl);
        console.log(`Chosen audio file set to: ${fileUrl}`);
        alert("Audio file set successfully!");
    } catch (error) {
        console.error("Failed to set chosen audio file:", error);
    }
}

/* Motion sensor module */
function onMotionSensorChange(callback) {
    const motionSensorRef = ref(database, "data/motion_sensor");
    onValue(motionSensorRef, (snapshot) => {
        callback(snapshot.exists() ? snapshot.val() : null);
    }, (error) => {
        console.error("Failed to fetch motion sensor data:", error);
    });
}

function setManualLock(isActivated) {
    const manualLockRef = ref(database, "data/manual_lock");
    const timeNowInSweden = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" });
    set(manualLockRef, { activated: isActivated, timestamp: timeNowInSweden })
        .catch(error => console.error("Failed to set manual lock status:", error));
}

function setManualLockTime(lockTime) {
    const manualLockTimeRef = ref(database, "data/manual_lock_time");
    const timeNowInSweden = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" });
    set(manualLockTimeRef, { lockTime, timestamp: timeNowInSweden })
        .catch(error => console.error("Failed to set manual lock time:", error));
}

export {
    auth, provider, signInWithPopup, signInWithRedirect, getRedirectResult,
    signOut, onAuthStateChanged, uploadFile, setUserInDatabase, setActiveUserOnDatabase,
    onVolumeChange, setVolumeInDatabase, getAudioFiles, onMotionSensorChange,
    setManualLock, setManualLockTime, setChosenAudioFile, onChosenAudioChange
};
