import React from 'react';
import "../css/style.css";
import { useNavigate } from 'react-router-dom'; 

export default function AboutProjectView(props) {
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

    
    return (
        <div className="project-info">
            <h1>This is the project!</h1>

        </div>
    );
}
