// just_home/Frontend/vite-project/src/Components/Mainnav/Mainnavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './mainnavbar.css';

const Mainnavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');

  // Cloudinary Links
  const logoUrl = "https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129590/vscf21yryptnxlvzwoky.png";
  const userIconUrl = "https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129700/ytuunnzhvinksaxocspm.png";

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Left Side: Logo */}
      <div className="navbar-left">
        <img src={logoUrl} alt="JustHome Logo" className="logo" />
        <span className="brand-name">JustHome</span>
      </div>

      {/* Center: Navigation Links */}
      <div className="nav-links">
        <Link to={isLoggedIn ? "/mainproperties" : "/"}>Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Right Side: User Icon */}
      <div className="user">
        <button className="user-button">
          <img src={userIconUrl} alt="User Icon" className="user-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Mainnavbar;
