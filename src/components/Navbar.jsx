import React from "react";
import { logout } from "../utils/Auth";
import Logo from '../assets/MEA-Digital-Agency.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav>
            <div>
                <img src={Logo} alt="Logo" height={'64px'} width={'64px'}/>
                <button className="btn-logout" onClick={() => handleLogout()}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar