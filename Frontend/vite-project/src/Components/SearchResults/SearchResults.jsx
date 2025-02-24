// Frontend/vite-project/src/Components/SearchResults/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import heart icons
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProperties, setLikedProperties] = useState({});

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:8000/properties?search=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          setProperties(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [searchQuery]);

  // Toggle wishlist (heart icon)
  const toggleLike = (propertyId, e) => {
    e.stopPropagation(); // Prevent navigation when clicking the heart
    setLikedProperties((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId], // Toggle like state
    }));
  };

  return (
    <div className="findhomes-wrapper">
      <h2 className="findhomes-heading">Properties Matching "{searchQuery}"</h2>
      {loading ? (
        <p className="findhomes-loading">Fetching results...</p>
      ) : properties.length > 0 ? (
        <div className="findhomes-grid">
          {properties.map((property) => (
            <div
              key={property._id}
              className="findhomes-card"
              onClick={() => navigate(`/property/${property._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="findhomes-image-wrapper">
                <img src={property.coverimg} alt={property.title} className="findhomes-image" />

                {/* Wishlist Icon (Heart) */}
                <div
                  className="findhomes-wishlist"
                  onClick={(e) => toggleLike(property._id, e)}
                >
                  {likedProperties[property._id] ? (
                    <FaHeart className="heart filled" /> // Filled red heart
                  ) : (
                    <FaRegHeart className="heart outline" /> // White heart with black border
                  )}
                </div>
              </div>

              <div className="findhomes-details">
                <h3 className="findhomes-title">{property.title}</h3>
                <p className="findhomes-category">{property.propertyType}</p>
                <p className="findhomes-location">📍 {property.location}</p>
                <p className="findhomes-cost">
                  <span className="findhomes-price">${property.price}</span> / {property.priceUnit}
                </p>
                <p className="findhomes-availability">{property.status}</p>
                <p className="findhomes-summary">
                  {property.description.length > 100
                    ? property.description.substring(0, 100) + "..."
                    : property.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="findhomes-no-results">No listings available.</p>
      )}
    </div>
  );
};

export default SearchResults;
