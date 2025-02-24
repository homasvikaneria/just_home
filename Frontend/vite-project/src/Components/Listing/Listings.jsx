// Frontend/vite-project/src/Components/Listing/Listings.jsx
import React, { useEffect, useState } from "react";
import { categories } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../../redux/state";
// import ListingCard from "./ListingCard"; // Ensure this component exists
import "./Listings.css"; // Import CSS

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  const getQueryListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:8000/listing?category=${selectedCategory}`
          : "http://localhost:8000/listing",
        { method: "GET" }
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getQueryListings();
  }, [selectedCategory]);

  return (
    <section id="listing" className="listings-container">
      {/* Title */}
      <div className="listings-title">
        <h6>From concept to reality</h6>
        <h2>Discover our newest listings</h2>
      </div>

      {/* Categories container */}
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

      {/* Properties / Listings */}
      {loading ? (
        <p>Loading listings...</p>
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
