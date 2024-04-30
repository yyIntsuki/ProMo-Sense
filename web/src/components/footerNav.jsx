import "../css/common.css";
import "../css/components.css";
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
                <small>about</small>
                <h1>Project</h1>
            </div>
            <div onClick={navigateToTeam}>
                <small>about</small>
                <h1>Team</h1>
            </div>
        </div>
    )
}
