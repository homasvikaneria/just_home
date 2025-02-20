import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './mainnavbar.css';
import Logo from '../../assets/Logo.png';
import user from '../../assets/user.png';

const Mainnavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logoimg"><img src={Logo} alt="Logo" /></div>
      <div className="logo">JustHome</div>

      <div className="nav-links">
        <Link to={isLoggedIn ? "/mainproperties" : "/"}>Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/members">Members</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="user">
        <img src={user} alt="User Icon" className="user-icon" />
      </div>
    </nav>
  );
};

export default Mainnavbar;
