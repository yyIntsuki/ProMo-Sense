import "../css/style.css";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    function goToLogin() { navigate('/login'); }

    return (
        <div className="header-wrapper">
            <div className="title">
                <h1>ProMo-Sense</h1>
            </div>
            <div className="user">
                <h1 onClick={goToLogin}>Login</h1>
            </div>
        </div>
    )
}
