// src/components/ContactUsPage.js
import React, { useState } from 'react';
import './contactus.css';
import Mainnavbar from '../Mainnav/Mainnavbar';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && message) {
      console.log('Form Submitted:', { name, email, message });
      setName('');
      setEmail('');
      setMessage('');
      setSuccessMessage('Your message has been sent successfully!');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <>
    <Mainnavbar/>
    <div className="contact-us">
      <div className="contact-form-container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you!</p>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ContactUsPage;
