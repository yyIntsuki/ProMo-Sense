import "../css/style.css";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    function goToApp() { navigate('/'); }
    function goToLogin() { navigate('/login'); }

    return (
        <div className="header_wrapper">
            <div onClick={goToApp} className="title">
                <h1>ProMo-Sense</h1>
            </div>
            <div onClick={goToLogin} className="user">
                <h1>Login</h1>
            </div>
        </div>
    )
}
