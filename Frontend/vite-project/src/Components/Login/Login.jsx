import React, { useState } from 'react'; // React imports for state management
import { Link, useNavigate } from 'react-router-dom'; // Navigation and link handling
import { useDispatch } from "react-redux"; // Redux hook to update state
import { setLogin } from "../../redux/state"; // Import Redux action

function Login() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const navigate = useNavigate(); // Hook to navigate after login
  const dispatch = useDispatch(); // Redux dispatch function

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      // Send login data to backend
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Convert data to JSON format
      });

      if (!response.ok) {
        throw new Error("Invalid email or password"); // Handle errors properly
      }

      const loggedIn = await response.json(); // Get response data

      if (loggedIn.user && loggedIn.token) { // Ensure user & token exist
        dispatch(
          setLogin({
            user: loggedIn.user, // Save user info in Redux store
            token: loggedIn.token, // Save token for authentication
          })
        );
        navigate("/"); // Redirect to homepage after login
      }
    } catch (err) {
      console.error("Login failed:", err.message); // Handle login errors
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
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button> {/* Submit form */}
          <div>
            Don't have an account?  
            <Link to="/register" className="hi">Register</Link> {/* Link to Register page */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
