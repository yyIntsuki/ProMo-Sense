import React, { useState, useRef } from 'react';
import "../css/style.css";

export default function AppView() {
    const [selectedAudio, setSelectedAudio] = useState('');
    const audioRef = useRef(null);

    // Audio URLs
    const audioUrls = {
        passionfruit: 'https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Passionfruit.mp3?alt=media&token=5153bbfb-fcd0-4318-83a0-95c030adcd18',
        forever: 'https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Drake%2C%20Kanye%20West%2C%20Lil%20Wayne%2C%20Eminem%20-%20Forever%20(Explicit%20Version)%20(Official%20Music%20Video).mp3?alt=media&token=610695c6-d26c-4ebd-878f-4c9609963167'
    };


    const playAudio = (audioKey) => {
        const audioUrl = audioUrls[audioKey];
        if (audioRef.current) {
            audioRef.current.src = audioUrl; 
            audioRef.current.play(); 
        }
    };

    return (
        <div className="app_wrapper">
            <h1>Welcome to Group 9 webpage!</h1>
            <select onChange={(e) => playAudio(e.target.value)}>
                <option value="">Select a song</option>
                <option value="passionfruit">Passionfruit</option>
                <option value="forever">Forever</option>
            </select>
            <audio ref={audioRef} hidden>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
