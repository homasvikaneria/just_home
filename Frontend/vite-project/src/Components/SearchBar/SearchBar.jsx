// Frontend/vite-project/src/Components/SearchBar/SearchBar.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // ✅ Get navigate function

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // ✅ Navigate to SearchResults with query
        }
    };

    return (
        <div className="search-bar" style={{ margin: "100px 0px -50px 390px",border:"2px solid #1b4f5c" }}>
            <input
                type="text"
                placeholder="What type of property are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()} // ✅ Search on Enter key
            />
            <button className="search-btn" onClick={handleSearch}>
                <FaSearch />
            </button>
        </div>
    );
}

export default SearchBar;
