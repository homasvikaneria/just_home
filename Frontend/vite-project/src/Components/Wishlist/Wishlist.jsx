// just_home/Frontend/vite-project/src/Components/Wishlist/Wishlist.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../SearchResults/SearchResults.css";
import Mainnavbar from "../Mainnav/Mainnavbar";
import "./Wishlist.css";

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState({});
    const user = useSelector((state) => state.user);

    const fetchWishlist = async () => {
        if (!user?.user?._id) return;
    
        const url = `http://localhost:8000/users/${user.user._id}/wishlist`;
        console.log("🔍 Fetching wishlist from:", url); // Debugging
    
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`❌ Server responded with status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("✅ Backend response:", data);
            setWishlist(Array.isArray(data.wishList) ? data.wishList : []);
            setFavorites(
                (data.wishList || []).reduce((acc, item) => {
                    acc[item._id] = true;
                    return acc;
                }, {})
            );
        } catch (error) {
            console.error("❌ Error fetching wishlist:", error.message);
        }
        setLoading(false);
    };
    

    useEffect(() => {
        fetchWishlist();
    }, [user?.user?._id]); // ✅ Added dependency to ensure proper fetch

    const toggleWishlist = async (propertyId) => {
        if (!user?.user?._id) {
            navigate("/register");
            return;
        }

        try {
            const userId = user.user._id;
            const response = await fetch(`http://localhost:8000/users/${userId}/wishlist/${propertyId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                fetchWishlist(); // ✅ Ensuring UI updates properly
            } else {
                console.error("Failed to update wishlist:", await response.text());
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return (
        <div>
            <Mainnavbar />
            <div className="findhomes-wrapper">
                <h2 className="findhomes-heading">Your Wishlist</h2>
                {loading ? (
                    <p className="findhomes-loading">Loading wishlist...</p>
                ) : Array.isArray(wishlist) && wishlist.length > 0 ? (
                    <div className="findhomes-grid">
                        {wishlist.map((property) => (
                            <div key={property._id} className="findhomes-card" style={{ cursor: "pointer" }}>
                                <div className="findhomes-image-wrapper" onClick={() => navigate(`/property/${property._id}`)}>
                                    <img
                                        src={property.coverimg || "https://via.placeholder.com/300"} // Default image
                                        alt={property.title}
                                        className="findhomes-image"
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
                                    <p className="findhomes-category">{property.propertyType || "No type specified"}</p>
                                    <p className="findhomes-location">📍 {property.location}</p>
                                    <p className="findhomes-cost">
                                        <span className="findhomes-price">${property.price}</span> / {property.priceUnit}
                                    </p>
                                    <p className="findhomes-availability">{property.status}</p>
                                    <p className="findhomes-summary">
                                        {property.description || "No description available."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="findhomes-no-results">Oops! Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
