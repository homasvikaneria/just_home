// just_home/Frontend/vite-project/src/Components/SearchFilter/SearchFilter.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchFilter.css"
const FilterSection = () => {
  // State for input fields
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  // Reset all input fields
  const handleReset = () => {
    setKeyword("");
    setStatus("");

    setCategory("");
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

      {/* Reset and Search buttons */}
      <button className="reset-btn" onClick={handleReset}>Reset</button>
      <button className="search-btn">Search</button>
    </div>
  );
};

export default FilterSection;
