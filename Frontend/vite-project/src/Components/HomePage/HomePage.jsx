// just_home/Frontend/vite-project/src/Components/HomePage/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";



const LandingPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://just-home.onrender.com/properties");

        // Sort properties by overallRating in descending order
        const sortedProperties = response.data.sort((a, b) => b.overallRating - a.overallRating);

        // Get top 3 properties
        setProperties(sortedProperties.slice(0, 3));
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="landing-page">
      {/* Cover Image Section */}
      <div className="cover-image">
        <img src="https://source.unsplash.com/1600x600/?real-estate" alt="Cover" />
        <div className="cover-text">
          <h1>Find Your Dream Home</h1>
          <p>Discover the best properties with top ratings</p>
        </div>
      </div>

      <h2 className="section-title">Top Rated Properties</h2>
      <div className="properties-container">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
