import '../css/common.css';
import '../css/pages.css';
import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { getAudioFiles, setVolumeInDatabase, uploadFile, onVolumeChange, onMotionSensorChange, setManualLock, setManualLockTime, setChosenAudioFile, onLockTimeChange } from '../firebaseModel';

export default function App() {
    const { currentUser } = useContext(UserContext);
    const [selectedAudioUrl, setSelectedAudioUrl] = useState(localStorage.getItem('selectedAudioUrl') || '');
    const [volume, setVolume] = useState(0.5);
    const [audioUrls, setAudioUrls] = useState([]);
    const [motionSensorData, setMotionSensorData] = useState(null);
    const [lockTime, setLockTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [dbLockTime, setDbLockTime] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (currentUser) {
            onVolumeChange((value) => {
                setVolume(value);
                if (audioRef.current) { audioRef.current.volume = value; }
            });

            getAudioFiles(currentUser.uid)
            .then(urls => {
                const audioData = urls.map(fileData => {
                    let name = fileData.name.replace(/\.[^/.]+$/, "");
                    if (name.length > 16) {
                        name = name.substring(0, 16) + '...';
                    }
                    return { ...fileData, name };
                });
                setAudioUrls(audioData);
                if (selectedAudioUrl) {
                    const audio = audioData.find(audio => audio.url === selectedAudioUrl);
                    if (audio && audioRef.current) {
                        audioRef.current.src = audio.url;
                        audioRef.current.addEventListener('loadedmetadata', () => {
                            audioRef.current.volume = volume;
                        });
                        audioRef.current.load();
                    }
                }
            })
            .catch(error => {
                console.error('Error loading audio files:', error);
            });

        onMotionSensorChange((data) => {
            setMotionSensorData(data);
        });

        const unsubscribeLockTime = onLockTimeChange((lockTimeFromDb) => {
            setDbLockTime(lockTimeFromDb);
            if (lockTime === 0) {
                setLockTime(lockTimeFromDb);
            }
        });
        return () => {
            unsubscribeLockTime?.();
        };
    }
}, [currentUser, selectedAudioUrl]);

    useEffect(() => {
        let timer;
        if (remainingTime !== null && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [remainingTime]);

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
        if (audioRef.current) { audioRef.current.volume = volume; }
    }

    function handleAudioSelection(event) {
        event.preventDefault();
        const selectedUrl = event.target.value;
        setSelectedAudioUrl(selectedUrl);
        localStorage.setItem('selectedAudioUrl', selectedUrl); // Save to local storage
    }

    function chooseAudio(event) {
        event.preventDefault();
        const audioData = audioUrls.find(audio => audio.url === selectedAudioUrl);
        if (audioData) {
            setChosenAudioFile({ url: audioData.url, name: audioData.name });
            if (audioRef.current) {
                audioRef.current.src = audioData.url;
                audioRef.current.addEventListener('loadedmetadata', () => { audioRef.current.volume = volume; });
                audioRef.current.load();
            }
        } else { alert('Please select a sound first!'); }
    }

    function handleFileUpload(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if (file && currentUser) {
            uploadFile(file, currentUser.uid)
                .then(() => {
                    getAudioFiles(currentUser.uid)
                        .then(urls => { setAudioUrls(urls); });
                });
        } else { console.error('No file selected or user not logged in!'); }
    }

    function handleManualLock(event) {
        event.preventDefault();
        const newLockStatus = !isLocked;
        setManualLock(newLockStatus)
            .then(() => {
                console.log(`Manual lock ${newLockStatus ? 'activated' : 'deactivated'}.`);
                setIsLocked(newLockStatus);
                if (newLockStatus) { setRemainingTime(lockTime * 60); }
                else { setRemainingTime(null); }
            })
            .catch((error) => { console.error('Error changing manual lock status:', error); });
    }

    function handleManualLockTimeInput(event) {
        event.preventDefault();
        const newLockTime = event.target.value;
        setLockTime(newLockTime);
    }
    
    function handleManualLockTime(event) {
        event.preventDefault();
        const lockTimeValue = parseInt(lockTime, 10);
        if (!isNaN(lockTimeValue)) {
            setManualLockTime(lockTimeValue)
                .then(() => {
                    console.log(`Manual lock time set to ${lockTimeValue} minutes.`);
                    setRemainingTime(lockTimeValue * 60); 
                })
                .catch((error) => { console.error('Error setting manual lock time:', error); });
        } else {
            console.error('Invalid lock time');
        }
    }



    return (
        <>
            {currentUser ?
                <div className='app_wrapper'>
                    <div className='app_category'>
                        <h1>Status</h1>
                        <div className='item'>
                            <h3 className='item_title'>Motion sensor</h3>
                            {motionSensorData ?
                                <>
                                    <p>STATUS: <span>{motionSensorData.detected ? 'DETECTED' : 'NOT DETECTED'}</span></p>
                                    <p>INITIALIZED: <span>{motionSensorData.initialized ? 'TRUE' : 'FALSE'}</span></p>
                                    <p>TIME DETECTED: <span>{motionSensorData.time_detected ? motionSensorData.time_detected : '-'}</span></p>
                                    <p>TIME RUNNING: <span>{motionSensorData.time_running ? `${motionSensorData.time_running} (SEC)` : '-'}</span></p>
                                </>
                                :
                                <p>Loading motion sensor data...</p>
                            }
                        </div>
                        <div className='item'>
                            <h3 className='item_title'>Code-lock</h3>
                            <p>STATUS: <span>{remainingTime > 0 ? 'ACTIVE' : 'INACTIVE'}</span></p>
                            <p>REMAINING TIME: <span>{remainingTime !== null ? `${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? '0' : ''}${remainingTime % 60}` : '-'}</span></p>
                            <p>LOCK-TIME: <span>{dbLockTime} (MIN)</span></p>
                        </div>
                    </div>
                    <div className='app_category'>
                        <h1>Control</h1>
                        <div className='item'>
                            <h3 className='item_title'>Audio module</h3>
                            <audio ref={audioRef} preload='auto' hidden>Your browser does not support the audio element.</audio>
                            <div className='item_detail'>
                                <p>SAMPLE:</p>
                                <div className='detail_row'>
                                    <select className='audio_select' onChange={handleAudioSelection} value={selectedAudioUrl || ''}>
                                        <option value=''>Select a sound</option>
                                        {audioUrls.map((fileData, index) => (<option key={index} value={fileData.url}>{fileData.name}</option>))}
                                    </select>
                                    <button onClick={chooseAudio}>CHOOSE</button>
                                </div>
                            </div>
                            <div className='item_detail'>
                                <p>VOLUME:</p>
                                <div className='detail_row'>
                                    <button onClick={decreaseVolume}>－</button>
                                    <span> {Math.round(volume * 100)}％</span>
                                    <button onClick={increaseVolume}>＋</button>
                                    <button onClick={applyVolume}>APPLY</button>
                                </div>
                            </div>
                            <div className='item_detail'>
                                <p>UPLOAD:</p>
                                <div className='detail_row'>
                                    <input type='file' onChange={handleFileUpload} />
                                </div>
                            </div>
                        </div>
                        <div className='item'>
                            <h3 className='item_title'>Code-lock</h3>

                            <div className='item_detail'>
                                <p>MANUAL LOCK:</p>
                                <div className='detail_row'>
                                    <button onClick={handleManualLock}>{isLocked ? 'DEACTIVATE' : 'ACTIVATE'}</button>
                                </div>
                            </div>
                            <div className='item_detail'>
                                <p>LOCK-TIME:</p>
                                <div className='detail_row'>
                                    <input className='lock_time_input' type='number' onChange={handleManualLockTimeInput} value={lockTime === 0 ? "" :lockTime} min='1' step='1' />
                                    <p>(MIN)</p>
                                    <button onClick={handleManualLockTime}>APPLY</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='app_login_wrapper'><h1>Please login to continue</h1></div>
            }
        </>
    );

}

