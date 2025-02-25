// Frontend/vite-project/src/Components/SearchResults/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";
import SearchBar from "../SearchBar/SearchBar"; // ✅ Import the SearchBar
import Listings from "../Listing/Listings"


const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({}); // Store favorite states

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

  // Function to toggle wishlist (heart)
  const toggleFavorite = (propertyId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [propertyId]: !prevFavorites[propertyId],
    }));
  };

  return (
    <div>
      <SearchBar /> {/* ✅ Search bar at the top */}
      <Listings />

      <div className="findhomes-wrapper">
        <h2 className="findhomes-heading">Properties Matching "{searchQuery}"</h2>
        {loading ? (
          <p className="findhomes-loading">Fetching results...</p>
        ) : properties.length > 0 ? (
          <div className="findhomes-grid">
            {properties.map((property) => (
              <div key={property._id} className="findhomes-card" style={{ cursor: "pointer" }}>
                <div className="findhomes-image-wrapper" onClick={() => navigate(`/property/${property._id}`)}>
                  <img src={property.coverimg} alt={property.title} className="findhomes-image" />
                  <div
                    className="findhomes-wishlist"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation when clicking heart
                      toggleFavorite(property._id);
                    }}
                  >
                    <span className={`heart ${favorites[property._id] ? "filled" : "outline"}`}>
                      ♥
                    </span>
                  </div>
                </div>
                <div className="findhomes-details" onClick={() => navigate(`/property/${property._id}`)}>
                  <h3 className="findhomes-title">{property.title}</h3>
                  <p className="findhomes-category">{property.propertyType}</p>
                  <p className="findhomes-location">📍 {property.location}</p>
                  <p className="findhomes-cost">
                    <span className="findhomes-price">${property.price}</span> / {property.priceUnit}
                  </p>
                  <p className="findhomes-availability">{property.status}</p>
                  <p className="findhomes-summary">
                    {property.description.length > 100 ? property.description.substring(0, 100) + "..." : property.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="findhomes-no-results">No listings available.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
