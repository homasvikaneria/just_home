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



// src/Components/Register/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Use for redirection

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🛠️ Submit Form and Send Data to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create a data object (without file)
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON
        },
        body: JSON.stringify(data), // Send JSON data
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login"); // Redirect to login page
      } else {
        alert(result.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn-secondary rounded mt-2">
          Register
        </button>

        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
