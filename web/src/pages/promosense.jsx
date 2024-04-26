import { useState, useRef } from 'react';

export default function App() {
	const [selectedAudioUrl, setSelectedAudioUrl] = useState('');
	const [volume, setVolume] = useState(0.5);
	const audioRef = useRef(null);


	const handleAudioSelection = async (e) => {
		const selectedUrl = e.target.value;
		setSelectedAudioUrl(selectedUrl);
		
		try {
			const db = firebase.database();
			await db.child("selected-audio-url").set(selectedUrl);
		
		} catch (error) {
			console.error("Firebase operation failed:", error);
		}
		
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

	/* Mock-up Data */
	const data = {
		pir_on: true,
		pir_init: true,
		pir_detect: true,
		code_lock_status: true,
		code_lock_remaining: '00:50',
		code_lock_time: '5:00',
		audio_sample: 'JohnCena',
		audio_volume: 0.5,
	}

	return (
		<div className="app_wrapper">
			<h1 className="app_status">Status</h1>

			<div className="item">
				<h2 className="item_title">Motion sensor</h2>
				<p>STATUS: {data.pir_on ? 'ON' : 'OFF'}</p>
				<p>INITLIZATION: {data.pir_detect ? 'FINISHED' : 'PENDING'}</p>
				<p>DETECTION: {data.pir_detect ? 'TRUE' : 'FALSE'}</p>
			</div>

			<div className="item">
				<h2 className="item_title">Code-lock</h2>
				<p>STATUS: {data.code_lock_status ? 'ACTIVE' : 'INACTIVE'}</p>
				<p>REMAINING TIME: {data.code_lock_status ? `${data.code_lock_remaining} / ${data.code_lock_time}` : '-'}</p>
			</div>

			<h1 className="app_status">Control</h1>

			<div className="item">
				<audio ref={audioRef} preload="auto" hidden>Your browser does not support the audio element.</audio>
				<h2 className="item_title">Audio module</h2>
				<div className="item_detail">
					<p>SAMPLE:</p>
					<div className="detail_row">
						<select onChange={handleAudioSelection} value={selectedAudioUrl}>
							<option value="">Select a song</option>
							<option value="https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Passionfruit.mp3?alt=media&token=5153bbfb-fcd0-4318-83a0-95c030adcd18">Passionfruit</option>
							<option value="https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Drake%2C%20Kanye%20West%2C%20Lil%20Wayne%2C%20Eminem%20-%20Forever%20(Explicit%20Version)%20(Official%20Music%20Video).mp3?alt=media&token=610695c6-d26c-4ebd-878f-4c9609963167">Forever</option>
							<option value="https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Indila%20-%20Tourner%20Dans%20Le%20Vide.mp3?alt=media&token=186cecf5-641c-41e8-a153-e03dafff267d">Bugatti</option>
							<option value="https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Kanye%20West%20-%20Good%20Morning.mp3?alt=media&token=b3fb6f66-2653-42e0-801e-c252d9bdc3f0https://firebasestorage.googleapis.com/v0/b/promosencegrupp9-4bbcc.appspot.com/o/Kanye%20West%20-%20Good%20Morning.mp3?alt=media&token=b3fb6f66-2653-42e0-801e-c252d9bdc3f0">Good morning</option>
						</select>
						<button onClick={playAudio}>Test</button>
					</div>
				</div>
				<div className='item_detail'>
					<p>VOLUME:</p>
					<div className="detail_row">
						<button onClick={decreaseVolume}>-</button>
						<span> {Math.round(volume * 100)} </span>
						<button onClick={increaseVolume}>+</button>
					</div>
				</div>
			</div>
		</div>
	);
}