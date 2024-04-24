import "../css/style.css";
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    function goToApp() { navigate('/'); }
    function goToTeam() { navigate('/team'); }
    function goToProject() { navigate('/project'); }

    return (
        <div className="footer_wrapper">
            <div onClick={goToApp}><h1>App</h1></div>
            <div onClick={goToProject}><h1>The Project</h1></div>
            <div onClick={goToTeam}><h1>The Team</h1></div>
        </div>
    )
}
