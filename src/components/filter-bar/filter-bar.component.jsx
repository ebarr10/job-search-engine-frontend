import React, { useState } from "react";
import "./filter-bar.styles.css";

export const MultiInputSearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    siteName: "",
    searchTerm: "",
    location: "",
    jobType: "",
    isRemote: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    }
  };

  const handleReset = () => {
    setFilters({
      siteName: "",
      searchTerm: "",
      location: "",
      jobType: "",
      isRemote: "",
    });
  };

  return (
    <div className="filter-bar">
      <form onSubmit={handleSubmit} className="filter-form">
        <select
          type="text"
          name="siteName"
          value={filters.siteName}
          onChange={handleChange}
          className="input"
        >
          <option value="">Site? (default is all)</option>
          <option value="linkedin">LinkedIn</option>
          <option value="zip_recruiter">Zip Recruiter</option>
          <option value="indeed">Indeed</option>
          <option value="glassdoor">Glassdoor</option>
          <option value="google">Google</option>
        </select>
        <input
          type="text"
          name="searchTerm"
          placeholder="Keyword"
          value={filters.searchTerm}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
          className="input"
        />
        <select
          type="text"
          name="jobType"
          value={filters.jobType}
          onChange={handleChange}
          className="input"
        >
          <option value="">Job Type?</option>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="internship">Internship Time</option>
          <option value="contract">Contract Time</option>
        </select>
        <select
          name="isRemote"
          value={filters.isRemote}
          onChange={handleChange}
          className="input"
        >
          <option value="">Remote?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button type="submit" className="btn filter-btn">
          Fetch
        </button>
        <button type="button" onClick={handleReset} className="btn reset-btn">
          Reset
        </button>
      </form>
    </div>
  );
};
