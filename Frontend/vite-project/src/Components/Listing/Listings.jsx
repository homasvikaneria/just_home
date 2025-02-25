import React, { useEffect, useState } from "react";
import { categories } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../../redux/state";
import "./Listings.css"; // Import CSS

const Listings = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  const getQueryListings = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const url =
        searchQuery && searchQuery.trim()
          ? `http://localhost:8000/listing?search=${encodeURIComponent(searchQuery)}`
          : selectedCategory !== "All"
          ? `http://localhost:8000/listing?category=${selectedCategory}`
          : "http://localhost:8000/listing";

      const response = await fetch(url, { method: "GET" });

      if (!response.ok) throw new Error("Failed to fetch listings");

      const data = await response.json();
      dispatch(setListings({ listings: data }));
    } catch (err) {
      setError("Failed to load listings. Please try again.");
      console.error("Fetch Listings failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) getQueryListings(); // Prevent fetching if search is active
  }, [selectedCategory, searchQuery]);

  return (
    <section id="listing" className="listings-container">
      {/* Categories container */}
      {!searchQuery && (
        <div className="categories-container">
          {categories.map((category) => (
            <div
              key={category.label}
              onClick={() => setSelectedCategory(category.label)}
              className={`category-box ${category.label === selectedCategory ? "active" : ""}`}
            >
              <div className="category-icon" style={{ backgroundColor: category.color }}>
                {category.icon}
              </div>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Properties / Listings */}
      {loading ? (
        <p>Loading listings...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : listings.length > 0 ? (
        <div className="listings-grid">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              title,
              description,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                title={title}
                description={description}
                booking={booking}
              />
            )
          )}
        </div>
      ) : (
        <p>No properties found.</p>
      )}
    </section>
  );
};

export default Listings;
