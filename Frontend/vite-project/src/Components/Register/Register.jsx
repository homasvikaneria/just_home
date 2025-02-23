import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdUpload } from "react-icons/md"; // Ensure correct import

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
    }
  };

  return (
    <div>
      <div>
        <form>
          <div>
            <h4>Sign Up</h4>
          </div>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            required
            onChange={handleChange}
          />

          {/* File Upload */}
          <input
            type="file"
            id="image"
            name="profileImage"
            accept="image/*"
            hidden
            onChange={handleFileChange} // Ensure correct handler
          />
          <label htmlFor="image">
            <div>
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="profileImg"
                  style={{ width: "50px", height: "50px", objectFit: "cover",  }}
                />
              ) : (
                <MdUpload size={50} />
              )}
            </div>
          </label>

          <button type="submit" className="btn-secondary rounded mt-2">
            Register
          </button>

          <div>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
