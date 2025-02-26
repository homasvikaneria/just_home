// Frontend/vite-project/src/Components/Login/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/state";
import { Grid, Paper, TextField, Button, Typography, Checkbox, FormControlLabel, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
      const response = await fetch("http://localhost:8000/users/login", {
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

  const paperStyle = { padding: 30, height: "auto", width: 400, borderRadius: 10 };
  const btnstyle = { margin: "16px 0", padding: "10px" };
  const gridContainerStyle = { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" };

  return (
    <Grid container style={gridContainerStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
        </Grid>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            margin="normal"
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
          <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" style={{ marginTop: 10 }} />
          <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth disabled={isLoading}>
            {isLoading ? "Logging in..." : "Sign in"}
          </Button>
        </form>
        <Typography align="center" style={{ marginTop: 10 }}>
          <Link to="/forgot-password">Forgot password?</Link>
        </Typography>
        <Typography align="center" style={{ marginTop: 5 }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </Typography>
      </Paper>git commit 
    </Grid>
  );
};

export default Login;

