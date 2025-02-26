import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Paper, TextField, Button, Typography, Avatar, IconButton } from "@mui/material";
import { MdUpload } from "react-icons/md";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.name || !formData.surname || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        setError(result.message || "Registration Failed");
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Paper elevation={10} style={{ padding: 30, width: 400, borderRadius: 10 }}>
        <Grid align="center">
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
        </Grid>

        {error && <Typography color="error" align="center">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          {/* Name and Surname Side by Side */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="First Name" name="name" fullWidth required value={formData.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Last Name" name="surname" fullWidth required value={formData.surname} onChange={handleChange} />
            </Grid>
          </Grid>

          <TextField label="Email" name="email" fullWidth required margin="normal" value={formData.email} onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth required margin="normal" value={formData.password} onChange={handleChange} />
          <TextField label="Confirm Password" name="confirmPassword" type="password" fullWidth required margin="normal" value={formData.confirmPassword} onChange={handleChange} />

          {/* Profile Image Upload */}
          <Grid container direction="column" alignItems="center" style={{ marginTop: 15 }}>
            <input type="file" id="image" name="profileImage" accept="image/*" hidden onChange={handleFileChange} />
            <label htmlFor="image">
              <IconButton
                component="span"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px dashed #aaa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {imagePreview ? (
                  <Avatar src={imagePreview} sx={{ width: "100%", height: "100%" }} />
                ) : (
                  <MdUpload size={40} color="#888" />
                )}
              </IconButton>
            </label>
            <Typography variant="caption" color="textSecondary" sx={{ marginTop: 1 }}>
              {imagePreview ? "Change Image" : "Upload Profile Picture"}
            </Typography>
          </Grid>

          <Button type="submit" color="primary" variant="contained" fullWidth style={{ marginTop: 20 }} disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Typography align="center" style={{ marginTop: 10 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
