import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add login functionality here
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h4>Login</h4>
          </div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <div>
            Don't have an account?  
            <Link to="/register" className="hi">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
