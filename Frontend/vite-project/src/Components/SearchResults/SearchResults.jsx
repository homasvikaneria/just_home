// Frontend/vite-project/src/Components/SearchResults/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SearchResults.css";
import SearchBar from "../SearchBar/SearchBar";
import Mainnavbar from "../Mainnav/Mainnavbar";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [error, setError] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const user = useSelector((state) => state.user);

  // Fetch search results based on query
  useEffect(() => {
    if (!searchQuery?.trim()) return;
    setLoading(true);

    fetch(`http://localhost:8000/properties?search=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch search results.");
        setLoading(false);
      });
  }, [searchQuery]);

  // Fetch user's wishlist on load
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.user?._id) return;
      setWishlistLoading(true);

      try {
        const response = await fetch(`http://localhost:8000/users/${user.user._id}/wishlist`);
        if (response.ok) {
          const data = await response.json();
          const wishlistMap = (data.wishList || []).reduce((acc, item) => {
            acc[item._id] = true;
            return acc;
          }, {});

          setFavorites(wishlistMap);
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
      setWishlistLoading(false);
    };

    fetchWishlist();
  }, [user]);

  // Toggle Wishlist Function
  const toggleWishlist = async (propertyId) => {
    if (!user?.user?._id) {
      // console.error("User not found");
      navigate("/register"); // Redirect to signup page

      return;
    }

    try {
      const userId = user.user._id;
      const response = await fetch(
        `http://localhost:8000/users/${userId}/wishlist/${propertyId}`,
        { method: "PUT", headers: { "Content-Type": "application/json" } }
      );

      if (response.ok) {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [propertyId]: !prevFavorites[propertyId],
        }));
      } else {
        console.error("Failed to update wishlist:", await response.text());
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div>
      <Mainnavbar/>
      <SearchBar />
      {searchQuery && (
        <div className="findhomes-wrapper">
          <h2 className="findhomes-heading">Properties Matching "{searchQuery}"</h2>
          {loading ? (
            <p className="findhomes-loading">Fetching results...</p>
          ) : error ? (
            <p className="findhomes-error">{error}</p>
          ) : properties.length > 0 ? (
            <div className="findhomes-grid">
              {properties.map((property) => (
                <div key={property._id} className="findhomes-card" style={{ cursor: "pointer" }}>
                  <div className="findhomes-image-wrapper" onClick={() => navigate(`/property/${property._id}`)}>
                    <img
                      src={property.coverimg}
                      alt={property.title}
                      className="findhomes-image"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                    <div
                      className="findhomes-wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(property._id);
                      }}
                    >
                      <span className={`heart ${favorites[property._id] ? "filled" : "outline"}`}>♥</span>
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
      )}

    </div>
  );
};

export default SearchResults;
