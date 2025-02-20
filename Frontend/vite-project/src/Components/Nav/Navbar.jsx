import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './navbar.css';
import Logo from '../../assets/Logo.png';
import user from '../../assets/user.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className='logoimg'><img src={Logo} alt="Logo" /></div>
      <div className="logo">JustHome</div>

      <div className="nav-links">
        <Link to="/">Home</Link> {/* Navigate to Landing Page */}
        <Link to="/blog">Blog</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
