// // Frontend/vite-project/src/Components/Register/Register.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import { MdUpload } from "react-icons/md";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null,
//   });

//   const navigate = useNavigate(); // Use for redirection

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prevData) => ({
//         ...prevData,
//         profileImage: file,
//       }));
//     }
//   };

//   // 🛠️ Submit Form and Send Data to Backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate password match
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     // Create FormData for file upload
//     const data = new FormData();
//     data.append("firstName", formData.firstName);
//     data.append("lastName", formData.lastName);
//     data.append("email", formData.email);
//     data.append("password", formData.password);
//     if (formData.profileImage) {
//       data.append("profileImage", formData.profileImage);
//     }

//     try {
//       const response = await fetch("http://localhost:8000/users/register", {
//         method: "POST",
//         body: data, // Send form data
//       });

//       const result = await response.json();
//       console.log("Response:", result);

//       if (response.ok) {
//         alert("Registration Successful!");
//         navigate("/login"); // Redirect to login page
//       } else {
//         alert(result.message || "Registration Failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong, please try again.");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <h4>Sign Up</h4>
//           </div>

//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             required
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             required
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             required
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             required
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             required
//             onChange={handleChange}
//           />

//           {/* File Upload */}
//           <input
//             type="file"
//             id="image"
//             name="profileImage"
//             accept="image/*"
//             hidden
//             onChange={handleFileChange}
//           />
//           <label htmlFor="image">
//             <div>
//               {formData.profileImage ? (
//                 <img
//                   src={URL.createObjectURL(formData.profileImage)}
//                   alt="profileImg"
//                   style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                 />
//               ) : (
//                 <MdUpload size={50} />
//               )}
//             </div>
//           </label>

//           <button type="submit" className="btn-secondary rounded mt-2">
//             Register
//           </button>

//           <div>
//             Already have an account? <Link to="/login">Login</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const [imagePreview, setImagePreview] = useState(null); // ✅ Image preview state
  const [error, setError] = useState(""); // ✅ Error message state
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state

  const navigate = useNavigate();

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
      setImagePreview(URL.createObjectURL(file)); // ✅ Create preview
    }
  };

  // 🛠️ Submit Form and Send Data to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // ✅ Reset previous errors
    setIsLoading(true); // ✅ Set loading state

    // 🚨 Client-side validation
    if (
      !formData.name ||
      !formData.surname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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
      console.log("Response:", result);

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        setError(result.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false); // ✅ Reset loading state
    }
  };

  return (
    <div className="padding" style={{ padding: "80px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Sign Up</h4>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Show errors */}

        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Last Name"
          value={formData.surname}
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
          onChange={handleFileChange}
        />
        <label htmlFor="image">
          <div style={{ cursor: "pointer", margin: "10px 0" }}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="profile"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #ccc",
                }}
              />
            ) : (
              <MdUpload size={50} />
            )}
          </div>
        </label>

        <button type="submit" disabled={isLoading} className="btn-secondary rounded mt-2">
          {isLoading ? "Registering..." : "Register"} {/* ✅ Show loading state */}
        </button>

        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
