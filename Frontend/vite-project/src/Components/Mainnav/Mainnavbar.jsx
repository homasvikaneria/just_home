import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import Redux state
import './mainnavbar.css';

const Mainnavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user from Redux (Assuming you store user details in Redux)
  const user = useSelector((state) => state.user);

  // Default profile image
  const defaultUserIcon = "https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129700/ytuunnzhvinksaxocspm.png";

  // Use the user's profile image if available
  const userIconUrl = user?.profileImage || defaultUserIcon;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Left Side: Logo & Brand Name (Clickable) */}
      <Link to="/" className="navbar-left">
        <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129590/vscf21yryptnxlvzwoky.png" alt="JustHome Logo" className="logo" />
        <span className="brand-name">JustHome</span>
      </Link>

      {/* Center: Navigation Links */}
      <div className="nav-links">
        <Link to={isLoggedIn ? "/mainproperties" : "/"}>Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Right Side: User Icon with Dropdown */}
      <div className="user">
        <button className="user-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={userIconUrl} alt="User Icon" className="user-icon" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Mainnavbar;
