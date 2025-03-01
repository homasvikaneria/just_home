// just_home/Frontend/vite-project/src/Components/HomePage/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaHome, FaUserTie, FaKey  } from "react-icons/fa";
import "./HomePage.css";
import Mainnavbar from "../Mainnav/Mainnavbar";
import Footer from "../Footer/Footer";
import { categories } from "../../assets/data"; // Import the same categories


const HomePage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");




  const handleCategoryClick = (categoryName) => {
    navigate(`/search?query=${encodeURIComponent(categoryName)}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://just-home.onrender.com/properties");

        // Sort properties by overallRating in descending order
        const sortedProperties = response.data.sort((a, b) => b.overallRating - a.overallRating);

        // Get top 3 properties
        setProperties(sortedProperties.slice(0, 4));
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleStateClick = (state) => {
    console.log("Navigating to state:", state);
    navigate("/state-properties", { state: { selectedState: state } });
  };

  return (
    <div>
      <Mainnavbar />

      {/* Section: Find Properties in Cities */}
      {/* <div className="App">
        <section className="city-properties">
          <h1 className="heading1">Find Properties in These Cities</h1>
          <p className="just_below">Select a city to explore properties</p>

          <div className="city-cards-line1">
            <button className="card1button" onClick={() => handleStateClick("New York")}>
              <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166305/mtsao2oyk48oty5llpbk.png" alt="New York" />
            </button>
            <button className="card2button" onClick={() => handleStateClick("California")}>
              <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740162750/sjz8yuxj42s5cyoee6pc.png" alt="California" />
            </button>
            <button className="card3button" onClick={() => handleStateClick("Illinois")}>
              <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166204/hppeskktajagwb4kj8pn.png" alt="Illinois" />
            </button>
          </div>

          <div className="city-cards-line2">
            <button className="card4button" onClick={() => handleStateClick("Texas")}>
              <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166232/hno1sqxuurmbr3gc2rvs.png" alt="Texas" />
            </button>
            <button className="card5button" onClick={() => handleStateClick("Florida")}>
              <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166286/tkb58dg7ydo6vjct4mih.png" alt="Florida" />
            </button>
            <button className="card6button" onClick={() => handleStateClick("Washington")}>
              <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740166305/mtsao2oyk48oty5llpbk.png" alt="Washington" />
            </button>
          </div>
        </section>
      </div> */}




      <div className="homepage-container">
        <div className="search-section">
          <h1 className="search-title">Believe in finding it</h1>
          <p className="search-subtitle">Search properties for sale and to rent</p>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="What type of property are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Allow Enter key to trigger search
            />
            <button className="search-btn" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          <h3 className="search-category-title">What are you looking for?</h3>

          <div className="property-categories">
  {categories.map((category) => (
    <div
      key={category.label}
      className="category"
      onClick={() => handleCategoryClick(category.label)}
    >
      <div className="category-icon" style={{ backgroundColor: category.color }}>
        {category.icon} {/* Use the same icons from categories */}
      </div>
      <span>{category.label}</span>
    </div>
  ))}
</div>
        </div>
      </div>

      {/* Section: Top Rated Properties */}
      <div className="landing-page">
        {/* Cover Image Section */}
        {/* <div className="cover-image">
          <img src="https://source.unsplash.com/1600x600/?real-estate" alt="Cover" />
          <div className="cover-text">
            <h1>Find Your Dream Home</h1>
            <p>Discover the best properties with top ratings</p>
          </div>
        </div> */}

        <h2 className="section-title">Top Rated Properties</h2>
        <div className="properties-container">
          {properties.map((property) => (
            <Link key={property._id} to={`/property/${property._id}`} className="property-card">
              <img
                src={property.coverimg || "https://source.unsplash.com/400x300/?house"}
                alt={property.title}
                className="property-image"
              />
              <div className="property-details">
                <h3>{property.title}</h3>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> {property.price} {property.priceUnit}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
                <p><strong>Overall Rating:</strong> ⭐ {property.overallRating}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>


      {/* Section: Become a Real Estate Agent */}
      <section className="real-estate-agent">
        <div className="agent-text">
          <h2>Become a Real Estate Agent</h2>
          <p>Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut morbi. Leo diam diam.</p>
          <div className="cta-container">
            <a href="/register-agent" className="register-btn1">Register Now →</a>
            <span className="contact-info">📞 +68 685 88666</span>
          </div>
        </div>

        <div className="agent-image-container">
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740196542/gjtsz4xhmpfjb6vjllf1.png" alt="Real Estate Agent" className="agent-image" />
        </div>
      </section>
      <div className="how-it-works">
        <h2>How It Works? Find a perfect home</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <div className="steps-container">
          {/* Step 1 */}
          <div className="step">
            <div className="icon-circle">
              <FaHome className="icon" />
            </div>
            <h3>Find Real Estate</h3>
            <p>Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco.</p>
          </div>

          {/* Step 2 */}
          <div className="step">
            <div className="icon-circle">
              <FaUserTie className="icon" />
            </div>
            <h3>Meet Realtor</h3>
            <p>Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco.</p>
          </div>

          {/* Step 3 */}
          <div className="step">
            <div className="icon-circle">
              <FaKey className="icon" />
            </div>
            <h3>Take The Keys</h3>
            <p>Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco.</p>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default HomePage;
