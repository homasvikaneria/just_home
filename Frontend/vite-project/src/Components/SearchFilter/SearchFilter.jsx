// just_home/Frontend/vite-project/src/Components/SearchFilter/SearchFilter.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Slider } from "@mui/material"; // Importing MUI Slider
import "./SearchFilter.css";

const FilterSection = () => {
  // State for input fields
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([500, 500000]); // Default price range in ₹

  // Reset all input fields
  const handleReset = () => {
    setKeyword("");
    setStatus("");
    setCategory("");
    setPriceRange([500, 500000]); // Reset price range
  };

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label className="filter-label">Keyword</label>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Enter Keyword"
            className="search-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="filter-item">
        <label className="filter-label">Status</label>
        <select className="dropdown" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
      </div>

      <div className="filter-item">
        <label className="filter-label">Category</label>
        <select className="dropdown" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="seaside">Seaside</option>
          <option value="wind-farm">Wind Farm</option>
          <option value="rural-area">Rural Area</option>
          <option value="desert-retreat">Desert Retreat</option>
          <option value="private-island">Private Island</option>
          <option value="ski-resorts">Ski Resorts</option>
          <option value="luxury-pools">Luxury Pools</option>
          <option value="lakeside">Lakeside</option>
        </select>
      </div>

      {/* Price Filter inside the same container */}
      <div className="filter-item price-filter">
        <label className="filter-label">Price Range (₹)</label>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={500}
          max={500000}
          sx={{
            color: "Black", // Main slider color
            "& .MuiSlider-thumb": {
              backgroundColor: "#1B4F5C",
              
              
               // Thumb color
            },
            "& .MuiSlider-track": {
              backgroundColor: "#1B4F5C",
              opacity: 0.5, // 50% Opacity
               // Track color
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#ddd", // Rail color
            },
          }}
        />
        <span className="price-range-text">{`₹${priceRange[0].toLocaleString()} - ₹${priceRange[1].toLocaleString()}`}</span>
      </div>

      {/* Reset and Search buttons */}
      <button className="reset-btn" onClick={handleReset}>Reset</button>
      <button className="search-btn">Search</button>
    </div>
  );
};

export default FilterSection;
