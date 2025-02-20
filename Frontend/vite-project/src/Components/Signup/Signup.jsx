import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Nav/Navbar';
import './signup.css';  // Reusing the same background CSS from login

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { name, surname, email, password };
    localStorage.setItem('user', JSON.stringify(userData));

    alert("Signed up successfully!");
    navigate('/login'); // Redirect to login page after signup
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="loginbox"> {/* Reusing the background class */}
        <div className="signup-form-container"> {/* Similar to login-form-container */}
          <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name & Surname side-by-side */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none"
              />
              <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button 
              type="submit"
              className="submitbtn"
            >
              Sign Up
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            Already have an account? <Link to="/login" className="text-blue-600">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
