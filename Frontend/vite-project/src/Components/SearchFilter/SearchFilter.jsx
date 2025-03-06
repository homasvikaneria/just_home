// just_home/Frontend/vite-project/src/Components/SearchFilter/SearchFilter.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SearchFilter.css";

const SearchFilter = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([500, 500000]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword) params.set("search", keyword);
    if (status) params.set("status", status);
    if (category) params.set("category", category);
    if (priceRange) {
      params.set("minPrice", priceRange[0]);
      params.set("maxPrice", priceRange[1]);
    }

    // ✅ Update the URL instead of fetching
    const queryString = params.toString();
    console.log("Navigating to:", `/search-results?${queryString}`); // ✅ Debugging
    navigate(`/search-results?${queryString}`);


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
          <option value="Wind Farm">Wind Farm</option>
          <option value="rural-area">Rural Area</option>
          <option value="desert-retreat">Desert Retreat</option>
          <option value="private-island">Private Island</option>
          <option value="ski-resorts">Ski Resorts</option>
          <option value="luxury-pools">Luxury Pools</option>
          <option value="lakeside">Lakeside</option>
          <option value="Urban Area">Urban Area</option>
        </select>
      </div>

      <div className="filter-item price-filter">
        <label className="filter-label">Price Range (₹)</label>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={500}
          max={500000}
        />
        <span className="price-range-text">{`₹${priceRange[0].toLocaleString()} - ₹${priceRange[1].toLocaleString()}`}</span>
      </div>

      <button className="search-btn" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;
