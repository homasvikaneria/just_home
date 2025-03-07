// just_home/Frontend/vite-project/src/Components/Wishlist/Wishlist.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, removeFromWishlist, addToWishlist } from "../../redux/state";
import Mainnavbar from "../Mainnav/Mainnavbar";
import "../SearchResults/SearchResults.css";
import "./Wishlist.css";

const Wishlist = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // ✅ Get wishlist from Redux instead of local state
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const wishlist = useSelector((state) => state.user.wishlist || []);

    const [loading, setLoading] = useState(true);

    // ✅ Fetch wishlist and update Redux state
    const fetchWishlist = async () => {
        if (!user?._id) return;

        const url = `http://localhost:8000/api/users/${user._id}/wishlist`;
        console.log("🔍 Fetching wishlist from:", url);

        setLoading(true);
        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const data = await response.json();
            console.log("✅ Wishlist from backend:", data);

            // ✅ Ensure wishlist contains only property IDs
            dispatch(setWishlist(data.wishList.map(item => item._id)));
        } catch (error) {
            console.error("❌ Error fetching wishlist:", error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWishlist();
    }, [user?._id]);

    // ✅ Toggle wishlist using Redux
    const toggleWishlist = async (propertyId) => {
        if (!user?._id) {
            navigate("/register");
            return;
        }

        const isInWishlist = wishlist.includes(propertyId);
        const method = isInWishlist ? "DELETE" : "POST";
        const endpoint = `http://localhost:8000/users/${user._id}/wishlist/${propertyId}`;

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                console.log("✅ Wishlist updated successfully");

                // ✅ Update Redux state
                if (isInWishlist) {
                    dispatch(removeFromWishlist(propertyId));
                } else {
                    dispatch(addToWishlist(propertyId));
                }
            } else {
                console.error("❌ Failed to update wishlist:", await response.text());
            }
        } catch (error) {
            console.error("❌ Error updating wishlist:", error);
        }
    };

    return (
        <div>
            <Mainnavbar />
            <div className="findhomes-wrapper">
                <h2 className="findhomes-heading">Your Wishlist</h2>

                {loading ? (
                    <p className="findhomes-loading">Loading wishlist...</p>
                ) : wishlist.length > 0 ? (
                    <div className="findhomes-grid">
                        {wishlist.map((propertyId) => (
                            <div key={propertyId} className="findhomes-card" style={{ cursor: "pointer" }}>
                                <div className="findhomes-image-wrapper" onClick={() => navigate(`/property/${propertyId}`)}>
                                    <img
                                        src={`http://localhost:8000/properties/${propertyId}/image`} // Placeholder for actual image URL
                                        alt="Property"
                                        className="findhomes-image"
                                    />
                                    <div
                                        className="findhomes-wishlist"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWishlist(propertyId);
                                        }}
                                    >
                                        <span className={`heart ${wishlist.includes(propertyId) ? "filled" : "outline"}`}>♥</span>
                                    </div>
                                </div>
                                <div className="findhomes-details" onClick={() => navigate(`/property/${propertyId}`)}>
                                    <h3 className="findhomes-title">Property {propertyId}</h3> {/* Replace with actual title */}
                                    <p className="findhomes-location">📍 Location Info</p> {/* Replace with actual location */}
                                    <p className="findhomes-cost">$XXX / Month</p> {/* Replace with actual price */}
                                    <p className="findhomes-availability">Available</p> {/* Replace with actual status */}
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
