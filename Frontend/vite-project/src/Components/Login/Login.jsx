// Frontend/vite-project/src/Components/Login/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/state";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
  
      const loggedIn = await response.json();
      console.log("✅ Login successful:", loggedIn); // Debug log
  
      if (loggedIn?.user && loggedIn?.token) {
        dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
        localStorage.setItem("user", JSON.stringify(loggedIn.user));
        localStorage.setItem("token", loggedIn.token);
  
        console.log("🔀 Navigating to home page...");
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Login failed:", err.message);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Login</h4>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="Email Address"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <div>
          Don't have an account?  
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
