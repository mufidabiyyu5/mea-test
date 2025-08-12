import React, { useState } from "react";
import { login } from '../api/Auth';
import { useNavigate } from "react-router-dom";
import { saveToken, isAuthenticated } from '../utils/Auth';
import './../styles/login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            if (response) {
                saveToken(response.data.user_id); // Assuming the response contains user_id
                // Redirect to home or perform any other action
                if (isAuthenticated()) {
                    console.log('success')
                    navigate('/home')
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
            // Handle error (e.g., show error message)
        }
    }

  return (
    <>
        <div className="login-container">
            <div className="left-container">
                <div style={{
                    color: 'white'
                }}>
                    <h1>KOMUNITAS MEA</h1>
                    <p>Komunitas Jago Jualan Online</p>
                </div>
            </div>
            <div className="right-container">
                <div>
                    <div>
                        <h1 style={{
                            color: '#d97a4a',
                            fontSize: '24px',
                            marginBlockEnd: '4px'

                        }}>Selamat Datang!</h1>
                        <p>Silahkan Masuk ke Akun Komunitas Mea kamu!</p>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <button className="btn" onClick={() => handleLogin()}>Login</button>
                </div>
            </div>
        </div>
    </>
  );
}

export default Login;