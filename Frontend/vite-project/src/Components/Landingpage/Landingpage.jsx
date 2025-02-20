import React from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Correct import

import Navbar from '../Nav/Navbar';
import './landingpage.css';

import Frame1 from '../../assets/Frame1.png';
import bgcimg from '../../assets/bgcimg.png';
import Icon1 from '../../assets/Icon1.png';
import Icon2 from '../../assets/Icon2.png';
import Icon3 from '../../assets/Icon3.png';
import user1 from '../../assets/user1.png';
import user2 from '../../assets/user2.png';
import user3 from '../../assets/user3.png';
import invertedcomma from '../../assets/invertedcomma.png';

const LandingPage = () => {
  const navigate = useNavigate();  // ✅ Initialize navigate

  return (
    <div>
      <Navbar />
      <section className='image'>
        <img src={Frame1} alt="" />
      </section>

      <section className="why-work">
        <h2>Why You Should Work With Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="features">
          <div>
            <img src={Icon1} alt="" />
            <h3>Wide Range of Properties</h3>
            <p>We offer expert legal help for all related property items in Dubai.</p>
          </div>
          <div>
            <img src={Icon2} alt="" />
            <h3>Buy or Rent Homes</h3>
            <p>We sell your home at the best market price and very quickly as well.</p>
          </div>
          <div>
            <img src={Icon3} alt="" />
            <h3>Trusted by Thousands</h3>
            <p>We offer you free consultancy to get a loan for your new home.</p>
          </div>
        </div>
      </section>

      <section className='discoverwithimg'>
        <section className='bgc'>
          <img className='bgc' src={bgcimg} alt="" />
        </section>
        <section className="discover">
          <h2>Discover a place you'll love to live</h2>
          <p>Find your dream home with us.</p>
          <button className='button' onClick={() => navigate('/login')}>
            Explore Properties
          </button>  {/* ✅ Navigation works now */}
        </section>
      </section>

      <section className="testimonials">
        <h2>What our customers are saying</h2>
        <div className="cards">
          <div>
            <img src={user1} alt="" />
            <h3>Mahesh Chandan - Designer</h3>
            <p>"Searches for multiplexes, property comparisons, and the loan estimator. Works great!"</p>
          </div>
          <div>
            <img src={user2} alt="" />
            <h3>Mahesh Chandan - Marketing</h3>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
          </div>
          <div>
            <img src={user3} alt="" />
            <h3>Mahesh Chandan - Developer</h3>
            <p>"Quick, easy, and reliable service for finding the perfect property."</p>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <h2>Stay Up to Date</h2>
        <p>Subscribe to our newsletter to receive our weekly feed.</p>
        <div>
          <input type="email" placeholder="Your e-mail" />
          <button>Send</button>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 JustHome</p>
        <div>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
