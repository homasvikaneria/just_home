// Frontend/vite-project/src/Components/Register/Register.jsx
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <div>
        <form action="">
          <div>
            <h4>Sign Up</h4>
          </div>
          <input 
            type="text" 
            name="firstName" 
            placeholder="First Name" 
            required 
          />
          <input 
            type="text" 
            name="lastName" 
            placeholder="Last Name" 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
          />
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            required 
          />
          <button type="submit">Register</button>
          <div>
            Already have an account?  
            <Link to="/login"> Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
