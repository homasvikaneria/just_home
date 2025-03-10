// just_home/Frontend/vite-project/src/Components/Login/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/state";
import { FcGoogle } from "react-icons/fc";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css"; // Import CSS for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://just-home.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const loggedIn = await response.json();

      if (loggedIn?.user && loggedIn?.token) {
        dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Grid container className="login-container">
      <Paper elevation={10} className="login-paper">
        <Grid align="center">
          <Typography variant="h5" className="login-title">
            Login
          </Typography>
        </Grid>

        {/* Google Login Button */}
        <div className="google-signup">
          <FcGoogle className="google-icon" />
          Login with Google
        </div>

        {/* OR Divider */}
        <Divider className="divider">OR</Divider>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            required
            margin="normal"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            margin="normal"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="outlined"
            className="login-btn"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Sign-up Link */}
        <Typography align="center" className="login-footer">
          Didn't have an account? <Link to="/register">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
