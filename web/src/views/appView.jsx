import React, { useState, useRef } from 'react';
import "../css/style.css";

export default function AppView() {
    
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null); 

   
    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    const firebaseAudioURL = 'https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Drake%2C%20Kanye%20West%2C%20Lil%20Wayne%2C%20Eminem%20-%20Forever%20(Explicit%20Version)%20(Official%20Music%20Video).mp3?alt=media&token=610695c6-d26c-4ebd-878f-4c9609963167';

    return (
        <div className="app_wrapper">
            <h1>Welcome to Group 9 webpage!</h1>
            <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <audio ref={audioRef} src={firebaseAudioURL} hidden>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
