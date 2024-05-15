import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, update, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

/* User authentication */
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

async function setUserInDatabase(user) {
    const userRef = ref(database, `users/${user.uid}`);
    return await set(userRef, {
        firstName: user.displayName?.split(' ')[0],
        email: user.email,
        lastLogin: new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })
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
        const fileDatas = await Promise.all(result.items.map(async item => ({
            url: await getDownloadURL(item),
            name: item.name
        })));
        return fileDatas;
    } catch (error) {
        console.error('Failed to fetch audio files:', error);
        return [];
    }
}

async function uploadFile(file, userId) {
    const fileRef = storageRef(storage, `user_files/${userId}/${file.name}`);
    try {
        const snapshot = await uploadBytes(fileRef, file);
        console.log('File uploaded successfully!', snapshot);
        alert('File uploaded successfully!');
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
    } catch (error) { console.error('Error uploading file:', error); }
}

function onVolumeChange(callback) {
    const volumeRef = ref(database, 'data/audio_module/volume');
    onValue(volumeRef,
        (snapshot) => { callback(snapshot.exists() ? snapshot.val() : null); },
        (error) => { console.error('Failed to fetch volume:', error); });
}

async function setVolumeInDatabase(volume) {
    const volumeRef = ref(database, 'data/audio_module/volume');
    set(volumeRef, volume)
        .then(() => { alert(`Volume saved to database: ${Math.round(volume * 100)}%`); })
        .catch((error) => { console.error('Failed to set volume:', error); });
}

function onChosenAudioChange(callback) {
    const chosenAudioRef = ref(database, 'data/audio_module/');
    onValue(chosenAudioRef,
        (snapshot) => { callback(snapshot.exists() ? snapshot.val() : null); },
        (error) => { console.error('Failed to fetch chosen audio:', error); });
}

async function setChosenAudioFile(audioData) {
    const chosenAudioRef = ref(database, 'data/audio_module/chosen_sound');
    try {
        await set(chosenAudioRef, {
            url: audioData.url,
            name: audioData.name
        });
        console.log(`Chosen audio file set to: ${audioData.name} at ${audioData.url}`);
        alert('Audio file set successfully!');
    } catch (error) { console.error('Failed to set chosen audio file:', error); }
}

/* Motion sensor module */
function onMotionSensorChange(callback) {
    const motionSensorRef = ref(database, 'data/motion_sensor');
    onValue(motionSensorRef,
        (snapshot) => { callback(snapshot.exists() ? snapshot.val() : null); },
        (error) => { console.error('Failed to fetch motion sensor data:', error); });
}

/* Code-lock module */
const codeLockRef = ref(database, 'data/code_lock');

function setManualLock(activated) {
    return update(codeLockRef, { activated, timestamp: Math.floor(Date.now() / 1000) })
        .catch((error) => { console.error('Failed to set manual lock status:', error); });
}

function setManualLockTime(duration) {
    return update(codeLockRef, { duration })
        .then(() => {
            console.log('Manual lock time set successfully.');
        })
        .catch((error) => {
            console.error('Failed to set manual lock time:', error);
            throw error;
        });
}


function onLockTimeChange(callback) {
    const lockTimeRef = ref(database, 'data/code_lock/duration');
    const unsubscribe = onValue(lockTimeRef, (snapshot) => {
        if (snapshot.exists()) {
            const lockTime = parseInt(snapshot.val(), 10);
            callback(lockTime);
        } else { console.log('No lock time data found.'); }
    }, (error) => { console.error('Failed to fetch lock time:', error); });
    return unsubscribe;
}

export {
    auth, provider, signInWithPopup, signInWithRedirect, getRedirectResult,
    signOut, onAuthStateChanged, uploadFile, setUserInDatabase, setActiveUserOnDatabase,
    onVolumeChange, setVolumeInDatabase, getAudioFiles, onMotionSensorChange,
    setManualLock, setManualLockTime, setChosenAudioFile, onChosenAudioChange, onLockTimeChange
};