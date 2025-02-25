import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './mainnavbar.css';

const Mainnavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 🔹 Reference for dropdown menu

  const user = useSelector((state) => state.user);
  const isLoggedIn = Boolean(user);

  const defaultUserIcon = "https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129700/ytuunnzhvinksaxocspm.png";
  const userIconUrl = user?.profileImage || defaultUserIcon;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔹 Handle click outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        <img 
          src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129590/vscf21yryptnxlvzwoky.png" 
          alt="JustHome Logo" 
          className="logo" 
        />
        <span className="brand-name">JustHome</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* USER DROPDOWN MENU */}
      <div className="user" ref={dropdownRef}>
        <button className="user-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={userIconUrl} alt="User Icon" className="user-icon" />
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <>
                <Link to="/wishlist">🖤 Wishlist</Link>
                <Link to="/create-listing">🏠 Add a Property</Link>
                <Link to="/my-reviews">⭐ Your Reviews</Link>
                <Link to="/edit-profile">✏️ Edit Profile</Link>
                <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">🔑 Sign In</Link>
                <Link to="/register">📝 Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Mainnavbar;
  