import "../css/style.css";
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    function navigateToApp() { navigate('/'); }
    function navigateToProject() { navigate('/project'); }
    function navigateToTeam() { navigate('/team'); }

    return (
        <div className="footer_wrapper">
            <div onClick={navigateToApp}><h1>App</h1></div>
            <div onClick={navigateToProject}>
                <p>about</p>
                <h1>Project</h1>
            </div>
            <div onClick={navigateToTeam}>
                <p>about</p>
                <h1>Team</h1>
            </div>
        </div>
    )
}
