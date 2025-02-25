// Frontend/vite-project/src/Components/Login/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/state";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Track error messages
  const [isLoading, setIsLoading] = useState(false); // ✅ Track loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // ✅ Clear previous errors
    setIsLoading(true); // ✅ Show loading state

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

        console.log("🔀 Navigating to home page...");
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Login failed:", err.message);
      setError(err.message); // ✅ Show error message to the user
    } finally {
      setIsLoading(false); // ✅ Reset loading state
    }
  };

  return (
    <div className="login" style={{ padding: "80px" }}>
      <form onSubmit={handleSubmit}>
        <h4>Login</h4>

        {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Show errors */}

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
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"} {/* ✅ Show loading state */}
        </button>

        <div>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
