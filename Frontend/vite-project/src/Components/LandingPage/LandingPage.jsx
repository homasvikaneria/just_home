// just_home/Frontend/vite-project/src/Components/LandingPage/LandingPage.jsx
import React from "react";
import { Link  , useNavigate } from "react-router-dom";
import Mainnavbar from "../Mainnav/Mainnavbar"
import './LandingPage.css'





const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Mainnavbar />

            <div className="lp-1">
                <div><img className="lp-bgc" src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740116320/lmrzswktnauo3vjyxm1k.png" alt="" /></div>
                <div className="text-container">
                    The <span className="highlight">#1</span> site real estate <br /> professionals trust*
                </div>
                <div className="sub-text-container">
                    From as low as $10 per day with limited time offer discounts. <br />
                    <span className="yellowtext"onClick={() => navigate("/homepage")} >Browse More Properties - </span>
                </div>

                <div className="main-yellowbox">
                    <div><img className="lp-yellowbox" src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740135994/k07mrmwvtykesq2n2pg6.png" alt="" /></div>
                    <div className="stats-container">
                        <div className="stat">
                            <h2>680</h2>
                            <p>Award Winning</p>
                        </div>
                        <div className="stat">
                            <h2>8K+</h2>
                            <p>Happy Customer</p>
                        </div>
                        <div className="stat">
                            <h2>500+</h2>
                            <p>Property Ready</p>
                        </div>
                    </div>
                </div>
            </div>







            <div className="reviews-container">
                <div className="reviews-text">
                    <h2 className="reviews-title">
                        What our customers are <br /> saying us?
                    </h2>
                </div>
                <div className="reviews-stats">
                    <div className="stat">
                        <span className="stat-number">10M+</span>
                        <p className="stat-label">Happy People</p>
                    </div>
                    <div className="stat">
                        <span className="stat-number">4.88</span>
                        <p className="stat-label">Overall rating</p>
                        <div className="stars">★★★★★</div>
                    </div>
                </div>
            </div>


            <div className="testimonials-container">
                <div className="testimonial-card">
                    <div className="testimonial-header">
                        <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740147085/nwn92rw1ubkditz7wj6n.png" alt="Mahesh Chandan" className="user-image" />
                        <div className="user-info">
                            <h3 className="user-name">Mahesh Chandan</h3>
                            <p className="user-role">Designer</p>
                        </div>
                        <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740146748/xcmimzdncbp0d0j5vfd7.png" alt="Quote" className="quote-icon" />
                    </div>
                    <p className="testimonial-text">
                        Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolores.
                    </p>
                </div>

                <div className="testimonial-card">
                    <div className="testimonial-header">
                        <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740154742/lqjncoynpppmm62weety.png" alt="Mahesh Chandan" className="user-image" />
                        <div className="user-info">
                            <h3 className="user-name">Mahesh Chandan</h3>
                            <p className="user-role">Marketing</p>
                        </div>
                        <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740146748/xcmimzdncbp0d0j5vfd7.png" alt="Quote" className="quote-icon" />
                    </div>
                    <p className="testimonial-text">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.
                    </p>
                </div>

                <div className="testimonial-card">
                    <div className="testimonial-header">
                        <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740154788/n00jjb3kedvxsco507au.png" alt="Mahesh Chandan" className="user-image" />
                        <div className="user-info">
                            <h3 className="user-name">Mahesh Chandan</h3>
                            <p className="user-role">Developer</p>
                        </div>
                        <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740146748/xcmimzdncbp0d0j5vfd7.png" alt="Quote" className="quote-icon" />
                    </div>
                    <p className="testimonial-text">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
                    </p>
                </div>
            </div>

            <p className="api-note">This data will be fetched from the API in the future.</p>




            

        </div>
    );
};

export default LandingPage;




