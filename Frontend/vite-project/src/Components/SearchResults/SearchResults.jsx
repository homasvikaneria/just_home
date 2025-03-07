// // just_home/Frontend/vite-project/src/Components/SearchResults/SearchResults.jsx
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./SearchResults.css";
// import SearchBar from "../SearchBar/SearchBar";
// import Mainnavbar from "../Mainnav/Mainnavbar";

// const SearchResults = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState({});
//   const [error, setError] = useState(null);
//   const [wishlistLoading, setWishlistLoading] = useState(true);

//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("query");

//   const user = useSelector((state) => state.user);

//   // Fetch search results based on query
//   useEffect(() => {
//     if (!searchQuery?.trim()) return;
//     setLoading(true);

//     fetch(`http://localhost:8000/properties?category=${encodeURIComponent(searchQuery)}`)
//     .then((res) => res.json())
//     .then((data) => {
//       setProperties(Array.isArray(data) ? data : []);
//       setLoading(false);
//     })
//     .catch(() => {
//       setError("Failed to fetch search results.");
//       setLoading(false);
//     });

//   }, [searchQuery]);

//   // Fetch user's wishlist on load
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!user?.user?._id) return;
//       setWishlistLoading(true);

//       try {
//         const response = await fetch(`http://localhost:8000/users/${user.user._id}/wishlist`);
//         if (response.ok) {
//           const data = await response.json();
//           const wishlistMap = (data.wishList || []).reduce((acc, item) => {
//             acc[item._id] = true;
//             return acc;
//           }, {});

//           setFavorites(wishlistMap);
//         } else {
//           console.error("Failed to fetch wishlist");
//         }
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//       setWishlistLoading(false);
//     };

//     fetchWishlist();
//   }, [user]);

//   // Toggle Wishlist Function
//   const toggleWishlist = async (propertyId) => {
//     if (!user?.user?._id) {
//       // console.error("User not found");
//       navigate("/register"); // Redirect to signup page

//       return;
//     }

//     try {
//       const userId = user.user._id;
//       const response = await fetch(
//         `http://localhost:8000/users/${userId}/wishlist/${propertyId}`,
//         { method: "PUT", headers: { "Content-Type": "application/json" } }
//       );

//       if (response.ok) {
//         setFavorites((prevFavorites) => ({
//           ...prevFavorites,
//           [propertyId]: !prevFavorites[propertyId],
//         }));
//       } else {
//         console.error("Failed to update wishlist:", await response.text());
//       }
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//     }
//   };

//   return (
//     <div>
//       <Mainnavbar />
//       <SearchBar />
//       {searchQuery && (
//         <div className="findhomes-wrapper">
//           <h2 className="findhomes-heading">Properties Matching "{searchQuery}"</h2>
//           {loading ? (
//             <p className="findhomes-loading">Fetching results...</p>
//           ) : error ? (
//             <p className="findhomes-error">{error}</p>
//           ) : properties.length > 0 ? (
//             <div className="findhomes-grid">
//               {properties.map((property) => (
//                 <div key={property._id} className="findhomes-card" style={{ cursor: "pointer" }}>
//                   <div className="findhomes-image-wrapper" onClick={() => navigate(`/property/${property._id}`)}>
//                     <img
//                       src={property.coverimg}
//                       alt={property.title}
//                       className="findhomes-image"
//                       onError={(e) => (e.target.src = "/fallback-image.jpg")}
//                     />
//                     <div
//                       className="findhomes-wishlist"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleWishlist(property._id);
//                       }}
//                     >
//                       <span className={`heart ${favorites[property._id] ? "filled" : "outline"}`}>♥</span>
//                     </div>
//                   </div>
//                   <div className="findhomes-details" onClick={() => navigate(`/property/${property._id}`)}>
//                     <h3 className="findhomes-title">{property.title}</h3>
//                     <p className="findhomes-category">{property.propertyType}</p>
//                     <p className="findhomes-location">📍 {property.location}</p>
//                     <p className="findhomes-cost">
//                       <span className="findhomes-price">${property.price}</span> / {property.priceUnit}
//                     </p>
//                     <p className="findhomes-availability">{property.status}</p>
//                     <p className="findhomes-summary">
//                       {property.description && property.description.length > 100
//                         ? property.description.substring(0, 100) + "..."
//                         : property.description || "No description available"}
//                     </p>

//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="findhomes-no-results">No listings available.</p>
//           )}
//         </div>
//       )}

//     </div>
//   );
// };

// export default SearchResults;


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";
import SearchFilter from "../SearchFilter/SearchFilter";
import Mainnavbar from "../Mainnav/Mainnavbar";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist, setWishlist } from "../../redux/state";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user information from Redux store
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const wishlist = useSelector((state) => state.user.wishlist || []);

  // State variables
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const listingType = queryParams.get("type");
    const keyword = queryParams.get("search");
    const category = queryParams.get("category");
    const status = queryParams.get("status");
    const minPrice = queryParams.get("minPrice");
    const maxPrice = queryParams.get("maxPrice");

    setLoading(true);

    let url = "http://localhost:8000/properties/filter";
    const params = [];

    if (listingType) params.push(`listingType=${listingType}`);
    if (keyword) params.push(`search=${keyword}`);
    if (category) params.push(`category=${category}`);
    if (status) params.push(`status=${status}`);
    if (minPrice) params.push(`minPrice=${minPrice}`);
    if (maxPrice) params.push(`maxPrice=${maxPrice}`);

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    console.log("🔍 Fetching from URL:", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Fetched Data:", data);
        setProperties(Array.isArray(data.properties) ? data.properties : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch Error:", err);
        setError("Failed to fetch search results.");
        setLoading(false);
      });
  }, [location.search]);

  // Fetch user's wishlist if logged in
  useEffect(() => {
    if (user && token) {
      fetch(`http://localhost:8000/users/${user._id}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.wishList) {
            // Extract just the IDs from wishList objects
            const wishlistIds = data.wishList.map((item) => 
              typeof item === 'string' ? item : item._id
            );
            console.log("📋 Fetched Wishlist:", wishlistIds);
            dispatch(setWishlist(wishlistIds));
          }
        })
        .catch((err) => {
          console.error("❌ Wishlist Fetch Error:", err);
        });
    }
  }, [user, token, dispatch]);

  // Toggle property in wishlist
  const toggleWishlist = (propertyId, event) => {
    event.stopPropagation(); // Prevent navigation when clicking the like button
    
    // If user is not logged in, redirect to register page
    if (!user || !token) {
      navigate("/register");
      return;
    }

    // Determine if we're adding or removing
    const isInWishlist = wishlist.includes(propertyId);
    
    // Update Redux state optimistically
    if (isInWishlist) {
      dispatch(removeFromWishlist(propertyId));
    } else {
      dispatch(addToWishlist(propertyId));
    }

    // Determine API endpoint based on action
    const endpoint = `http://localhost:8000/users/${user._id}/wishlist/${propertyId}`;
    const method = isInWishlist ? "DELETE" : "POST";

    // Send request to backend
    fetch(endpoint, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Wishlist Updated:", data);
      })
      .catch((err) => {
        console.error("❌ Wishlist Update Error:", err);
        // Revert optimistic update on error
        if (isInWishlist) {
          dispatch(addToWishlist(propertyId));
        } else {
          dispatch(removeFromWishlist(propertyId));
        }
      });
  };

  return (
    <div>
      <Mainnavbar />
      <SearchFilter />

      <div className="findhomes-wrapper">
        <h2 className="findhomes-heading">Search Results</h2>
        {loading ? (
          <p className="findhomes-loading">Fetching results...</p>
        ) : error ? (
          <p className="findhomes-error">{error}</p>
        ) : properties.length > 0 ? (
          <div className="findhomes-grid">
            {properties.map((property) => (
              <div key={property._id} className="findhomes-card">
                <div
                  className="findhomes-image-wrapper"
                  onClick={() => navigate(`/property/${property._id}`)}
                >
                  <img
                    src={property.photos?.[0] ? `http://localhost:8000${property.photos[0]}` : "/fallback-image.jpg"}
                    alt={property.charmInfo?.title}
                    className="findhomes-image"
                  />

                  <div
                    className="findhomes-wishlist"
                    onClick={(e) => toggleWishlist(property._id, e)}
                  >
                    <span className={`heart ${wishlist.includes(property._id) ? "filled" : "outline"}`}>♥</span>
                  </div>
                </div>
                <div className="findhomes-details">
                  <h3 className="findhomes-title">{property.charmInfo?.title}</h3>
                  <p className="findhomes-category">{property.category}</p>
                  <p className="findhomes-location">
                    📍 {property.address?.city || "Unknown City"}, {property.address?.state || "Unknown State"}
                  </p>
                  <p className="findhomes-cost">
                    ₹{property.charmInfo?.price.amount} ({property.charmInfo?.price.currency})
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