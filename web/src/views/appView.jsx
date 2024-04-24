import React, { useState, useRef } from 'react';
import "../css/style.css";

export default function AppView() {
    const [selectedAudioUrl, setSelectedAudioUrl] = useState('');
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
            </select>
            {/* Independent Play Button for Testing */}
            <button onClick={playAudio}>Play for Testing</button>
            <audio ref={audioRef} preload="auto" hidden>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
