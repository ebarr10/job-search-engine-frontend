import React from "react";
import "./search-bar.styles.css";

export const SearchBar = ({ onSearch, query, updateQuery }) => {
  const handleInputChange = (e) => {
    updateQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query); // Pass the query to the parent component
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
    </div>
  );
};
