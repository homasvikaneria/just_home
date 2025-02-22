// Frontend/vite-project/src/Components/Footer/Footer.jsx
import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";



const Footer = () => {


const appStore = "https://upload.wikimedia.org/wikipedia/commons/a/a4/Apple_logo_black.svg";
const playStore = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740201180/ynkob61qlwof9qqigriw.png" alt="JustHome" />
        </div>

        <div className="footer-sections">
          <div className="footer-column">
            <h3>Discover</h3>
            <ul>
              <li>Miami</li>
              <li>New York</li>
              <li>Chicago</li>
              <li>Florida</li>
              <li>Los Angeles</li>
              <li>San Diego</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>About</li>
              <li>Contact</li>
              <li>FAQ’s</li>
              <li>Blog</li>
              <li>Pricing Plans</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>hi@justhome.com</p>
            <p>(123) 456-7890</p>
          </div>

          <div className="footer-column">
            <h3>Our Address</h3>
            <p>99 Fifth Avenue, 3rd Floor</p>
            <p>San Francisco, CA 1980</p>
          </div>

          <div className="footer-column app-links">
            <h3>Get the app</h3>
            <a href="#">
              <img src={appStore} alt="Download on the Apple Store" className="store-badge" />
            </a>
            <a href="#">
              <img src={playStore} alt="Get it on Google Play" className="store-badge" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
