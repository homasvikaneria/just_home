import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Nav/Navbar';
import './login.css';  // ✅ Importing the external CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('Login successful!');
            navigate('/mainproperties');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className='loginbox'>  {/* Background applied here */}
                <div className='login-form-container'>  {/* Form styles */}
                    <h2 style={{ textAlign: 'center' }}>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Log In</button>
                    </form>
                    <p>
                        Don’t have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
