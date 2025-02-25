import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./mainnavbar.css";
import { setLogout } from "../../redux/state";
import { persistor } from "../../redux/store"; // ✅ Import persistor

const Mainnavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 🔹 Reference for dropdown menu

  // ✅ Ensure accessing the user object properly from Redux state
  const user = useSelector((state) => state.user?.user);
  const isLoggedIn = user !== null; // ✅ Fix login detection

  const defaultUserIcon =
    "https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129700/ytuunnzhvinksaxocspm.png";
  const userIconUrl = user?.profileImage || defaultUserIcon;
  const userName = user?.name || "User"; // ✅ Now correctly displays name

  // ✅ Handle Logout
  const handleLogout = () => {
    dispatch(setLogout()); // ✅ Reset Redux state
    persistor.purge(); // ✅ Clear persisted Redux state
    persistor.flush(); // ✅ Immediately apply purge
    localStorage.clear(); // ✅ Remove user/token
    sessionStorage.clear();
    setDropdownOpen(false);
    navigate("/");

    // ✅ Force UI update after logout
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // 🔹 Add Property function
  const handleAddProperty = () => {
    setDropdownOpen(false); // ✅ Close dropdown
    navigate("/create-listing"); // ✅ Navigate to the Add Property page
  };

  // 🔹 Close dropdown when clicking outside
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
                {/* 🔹 Show the user's name */}
                <div className="dropdown-header">👤 {userName}</div>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/profile">Edit Profile</Link>
                <Link to="/your-reviews">Your Reviews</Link>
                <button onClick={handleAddProperty}>Add a Property</button>
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
