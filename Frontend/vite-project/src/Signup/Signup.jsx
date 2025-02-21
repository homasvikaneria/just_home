import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("https://just-home.onrender.com/users", {
                name,
                surname,
                email,
                password,
            });

            alert("Signup Successful!");
            navigate('/login'); // Redirect to login page
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="signupbox">
            <div className="signup-form-container">
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-2">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </div>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <button type="submit" className="submitbtn">Sign Up</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Already have an account? <Link to="/login" className="text-blue-600">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
