import React, { useState, useRef } from 'react';
import "../css/style.css";

export default function AppView() {
    const [selectedAudioUrl, setSelectedAudioUrl] = useState('');
    const [volume, setVolume] = useState(0.5); 
    const audioRef = useRef(null);

    const handleAudioSelection = (e) => {
        const selectedUrl = e.target.value;
        setSelectedAudioUrl(selectedUrl);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = selectedUrl;
            audioRef.current.load(); 
        }
    };

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const increaseVolume = () => {
        const newVolume = Math.min(1, volume + 0.1); // ökar med 10% brusch
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const decreaseVolume = () => {
        const newVolume = Math.max(0, volume - 0.1); // minskar med 10% brusch
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const sensorStateChange = (newState) => {
        if (newState === 1 && selectedAudioUrl) {
            audioRef.current.play();
        }
    };

    return (
        <div className="app_wrapper">
            <h1>Welcome to Group 9 webpage!</h1>
            <select onChange={handleAudioSelection} value={selectedAudioUrl}>
                <option value="">Select a song</option>
                <option value="https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Passionfruit.mp3?alt=media&token=5153bbfb-fcd0-4318-83a0-95c030adcd18">Passionfruit</option>
                <option value="https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Drake%2C%20Kanye%20West%2C%20Lil%20Wayne%2C%20Eminem%20-%20Forever%20(Explicit%20Version)%20(Official%20Music%20Video).mp3?alt=media&token=610695c6-d26c-4ebd-878f-4c9609963167">Forever</option>
                <option value="https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Indila%20-%20Tourner%20Dans%20Le%20Vide.mp3?alt=media&token=186cecf5-641c-41e8-a153-e03dafff267d">Bugatti</option>
                <option value="https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Kanye%20West%20-%20Good%20Morning.mp3?alt=media&token=b3fb6f66-2653-42e0-801e-c252d9bdc3f0https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Kanye%20West%20-%20Good%20Morning.mp3?alt=media&token=b3fb6f66-2653-42e0-801e-c252d9bdc3f0">Good morning</option>
            
            </select>
            <button onClick={playAudio}>Play for Testing</button>
            <div>
                <button onClick={decreaseVolume}>-</button>
                <span> Volume: {Math.round(volume * 100)}%</span>
                <button onClick={increaseVolume}>+</button>
            </div>
            <audio ref={audioRef} preload="auto" hidden>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
