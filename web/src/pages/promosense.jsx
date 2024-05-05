import "../css/common.css";
import "../css/pages.css";
import { useState, useRef, useEffect, useContext } from "react";
import {
    getAudioFiles, setVolumeInDatabase, uploadFile, onVolumeChange, onMotionSensorChange
} from "../firebaseModel";
import { UserContext } from "../contexts/userContext";

export default function App() {
    const { currentUser } = useContext(UserContext);
    const [selectedAudioUrl, setSelectedAudioUrl] = useState("");
    const [volume, setVolume] = useState(0.5);
    const [audioUrls, setAudioUrls] = useState([]);
    const [motionSensorData, setMotionSensorData] = useState(null);
    const audioRef = useRef(null);
    const [lockTime, setLockTime] = useState(5);

    useEffect(() => {
        if (currentUser) {
            onVolumeChange((value) => {
                setVolume(value);
                if (audioRef.current) { audioRef.current.volume = value; }
            });
            getAudioFiles(currentUser.uid)
                .then(urls => { setAudioUrls(urls); })
                .catch(error => { console.error("Error loading audio files:", error); });

            onMotionSensorChange((data) => {
                setMotionSensorData(data);
            });
        }
    }, [currentUser]);

    function increaseVolume(event) {
        event.preventDefault();
        const newVolume = Math.min(1, Number((volume + 0.1).toFixed(2)));
        setVolume(newVolume);
        if (audioRef.current) { audioRef.current.volume = newVolume; }
    }

    function decreaseVolume(event) {
        event.preventDefault();
        const newVolume = Math.max(0, Number((volume - 0.1).toFixed(2)));
        setVolume(newVolume);
        if (audioRef.current) { audioRef.current.volume = newVolume; }
    }

    function applyVolume(event) {
        event.preventDefault();
        setVolumeInDatabase(volume);
    }

    function handleAudioSelection(event) {
        event.preventDefault();
        const selectedUrl = event.target.value;
        setSelectedAudioUrl(selectedUrl);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = selectedUrl;
            audioRef.current.load();
        }
    }

    function playAudio(event) {
        event.preventDefault();
        if (audioRef.current) { audioRef.current.play(); }
    }

    function handleFileUpload(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if (file && currentUser) {
            uploadFile(file, currentUser.uid)
                .then(() => {
                    getAudioFiles(currentUser.uid)
                        .then((urls) => {
                            setAudioUrls(urls);
                        });
                });
        } else { console.error("No file selected or user not logged in!"); }
    }

    function handleManualLock(event) {
        event.preventDefault();
        /* TODO? */
    }

    function handleManualLockTimeInput(event) {
        event.preventDefault();
        setLockTime(event.target.value);
        /* TODO? */
    }

    function handleManualLockTime(event) {
        event.preventDefault();
        /* TODO? */
    }

    return (
        <>
            {currentUser ?
                <div className="app_wrapper">
                    <div className='app_category'>
                        <h1>Status</h1>
                        <div className="item">
                            <h3 className="item_title">Motion sensor</h3>
                            {motionSensorData ?
                                <>
                                    <p>STATUS: <span>{motionSensorData.detected ? 'DETECTED' : 'NOT DETECTED'}</span></p>
                                    <p>INITIALIZED: <span>{motionSensorData.initialized ? 'TRUE' : 'FALSE'}</span></p>
                                    <p>TIME DETECTED: <span>{motionSensorData.time_detected}</span></p>
                                    <p>TIME RUNNING: <span>{motionSensorData.time_running}</span></p>
                                </>
                                : <p>Loading motion sensor data...</p>
                            }
                        </div>
                        <div className="item">
                            <h3 className="item_title">Code-lock</h3>
                            <p>STATUS: <span>INACTIVE</span></p>
                            <p>REMAINING TIME: <span>-</span></p>
                            <p>LOCK-TIME(MIN): <span>5</span></p>
                        </div>
                    </div>
                    <div className='app_category'>
                        <h1>Control</h1>
                        <div className="item">
                            <h3 className="item_title">Audio module</h3>
                            <audio ref={audioRef} preload="auto" hidden>Your browser does not support the audio element.</audio>
                            <div className="item_detail">
                                <p>SAMPLE:</p>
                                <div className="detail_row">
                                    <select className="audio_select" onChange={handleAudioSelection} value={selectedAudioUrl}>
                                        <option value="">Select a sound</option>
                                        {audioUrls.map((url, index) => (<option key={index} value={url}>{`Sound ${index + 1}`}</option>))}
                                    </select>
                                    <button onClick={playAudio}>Test</button>
                                </div>
                            </div>
                            <div className='item_detail'>
                                <p>VOLUME:</p>
                                <div className="detail_row">
                                    <button onClick={decreaseVolume}>－</button>
                                    <span> {Math.round(volume * 100)}％</span>
                                    <button onClick={increaseVolume}>＋</button>
                                    <button onClick={applyVolume}>APPLY</button>
                                </div>
                            </div>
                            <div className="item_detail">
                                <p>UPLOAD:</p>
                                <div className="detail_row">
                                    <input type="file" onChange={handleFileUpload} />
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <h3 className="item_title">Code-lock</h3>
                            <div className="item_detail">
                                <p>MANUAL LOCK: </p>
                                <div className="detail_row">
                                    <button onClick={handleManualLock}>ACTIVATE</button>
                                </div>
                            </div>
                            <div className="item_detail">
                                <p>LOCK-TIME(MIN):</p>
                                <div className="detail_row">
                                    <input className="lock_time_input" type="number" onChange={handleManualLockTimeInput} value={lockTime} step="1" />
                                    <button onClick={handleManualLockTime}>APPLY</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="app_login_wrapper"><h1>Please login to continue</h1></div>
            }
        </>
    );
}
