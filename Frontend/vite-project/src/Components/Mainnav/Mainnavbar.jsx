import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./mainnavbar.css";
import { setLogout } from "../../redux/state";
import { persistor } from "../../redux/store";

const Mainnavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  // Get user state
  const user = useSelector((state) => state.user?.user);
  const isLoggedIn = user !== null;

  const defaultUserIcon =
    "https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129700/ytuunnzhvinksaxocspm.png";
  const userIconUrl = user?.profileImage || defaultUserIcon;
  const userName = user?.name || "User";

  // Logout function
  const handleLogout = () => {
    dispatch(setLogout());
    persistor.purge();
    persistor.flush();
    localStorage.clear();
    sessionStorage.clear();

    setModalOpen(false);
    navigate("/");

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo & Brand Name */}
      <div className="navbar-left" onClick={() => navigate("/")}>
        <img
          src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740129590/vscf21yryptnxlvzwoky.png"
          alt="JustHome Logo"
          className="logo"
        />
        <span className="brand-name">JustHome</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* User Profile Button */}
      <div className="user">
        <button className="user-button" onClick={() => setModalOpen(true)}>
          <img src={userIconUrl} alt="User Icon" className="user-icon" />
        </button>
      </div>

      {/* User Pop-up Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setModalOpen(false)}>✖</span>

            {isLoggedIn ? (
              <>
                <div className="modal-header">👤 {userName}</div>
                <Link to="/wishlist" onClick={() => setModalOpen(false)}>Wishlist</Link>
                <Link to="/profile" onClick={() => setModalOpen(false)}>Edit Profile</Link>
                <Link to="/your-reviews" onClick={() => setModalOpen(false)}>Your Reviews</Link>
                <button onClick={() => { navigate("/create-listing"); setModalOpen(false); }}>
                  Add a Property
                </button>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <div className="modal-header">Welcome!</div>
                <Link to="/login" onClick={() => setModalOpen(false)}>Sign In</Link>
                <Link to="/register" onClick={() => setModalOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Mainnavbar;
