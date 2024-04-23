import React from 'react';
import "../css/style.css";
import { useNavigate } from 'react-router-dom'; 

export default function HomeView(props) {
    const navigate = useNavigate();  

    function textChangeHandlerACB(evt) {
        props.changeText(evt.target.value);
    }

    function searchClickedHandlerACB() {
        props.searchClicked();
    }

    function resetACB() {
        props.resetSearch();
    }

    function goToAbout() {
        navigate('/about');  
    }
	function goToAboutProject() {
        navigate('/aboutProject');  
    }
    
    return (
        <div className="home-wrapper">
            <h1>Welcome to Group 9 webpage!</h1>
            <button onClick={searchClickedHandlerACB}>App</button>
            <button onClick={goToAboutProject}>About Project</button>
            <button onClick={goToAbout}>About Us</button> 
        </div>
    );
}
