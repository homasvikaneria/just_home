import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './mainnavbar.css';

const Mainnavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const isLoggedIn = Boolean(user); // ✅ Ensure boolean check

  const defaultUserIcon = "https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129700/ytuunnzhvinksaxocspm.png";
  const userIconUrl = user?.profileImage || defaultUserIcon;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // ✅ Clear Redux state
    localStorage.removeItem("user"); // ✅ Remove user from storage
    navigate("/");
  };

  const handleAddProperty = () => {
    setDropdownOpen(false); // ✅ Close dropdown
    navigate("/create-listing"); // ✅ Navigate to Create Listing
  };

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
        <Link to={isLoggedIn ? "/mainproperties" : "/"}>Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="user">
        <button className="user-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={userIconUrl} alt="User Icon" className="user-icon" />
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <>
                <Link to="/profile">Profile</Link>
                <button onClick={handleAddProperty}>Add a Property</button> {/* ✅ FIXED */}
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Mainnavbar;
