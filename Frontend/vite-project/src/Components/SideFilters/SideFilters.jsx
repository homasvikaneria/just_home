// Frontend/vite-project/src/Components/SideFilters/SideFilters.jsx
import { useState } from "react";
import "./SideFilters.css";

const SideFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass filters to parent component
  };

  return (
    <div className="side-filters">
      <h3>Filters</h3>

      <label>Property Type</label>
      <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
        <option value="">All</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Villa">Villa</option>
      </select>

      <label>Min Price</label>
      <input type="number" name="minPrice" value={filters.minPrice} onChange={handleChange} />

      <label>Max Price</label>
      <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleChange} />

      <label>Location</label>
      <input type="text" name="location" value={filters.location} onChange={handleChange} />

      <label>Status</label>
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">All</option>
        <option value="Rent">Rent</option>
        <option value="Sale">Sale</option>
      </select>
    </div>
  );
};

export default SideFilters;
