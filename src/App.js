import React, { useEffect, useState } from "react";
import { PaginatedTable } from "./components/paginated-table/paginated-table.component";
import { MultiInputSearchBar } from "./components/filter-bar/filter-bar.component";
import { SearchBar } from "./components/search-bar/search-bar.component";
import { LoadingIndicator } from "./components/loading-indicator/loading-indicator.component";
import { fetchJobs } from "./api";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const populateJobs = (filters = {}) => {
    setIsLoading(true);
    updateQuery("");
    fetchJobs(filters)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    populateJobs();
  }, []);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const updateQuery = (newQuery) => setQuery(newQuery);
  const filterJobs = (filters = {}) => populateJobs(filters);

  // Need to include all columns as searchable
  const queryJobs = (query) => {
    setIsLoading(true);
    setFilteredJobs(
      jobs.filter(
        (job) =>
          job["site"]?.toLowerCase().includes(query.toLowerCase()) ||
          "" ||
          job["title"]?.toLowerCase().includes(query.toLowerCase()) ||
          "" ||
          job["company"]?.toLowerCase().includes(query.toLowerCase()) ||
          "" ||
          job["location"]?.toLowerCase().includes(query.toLowerCase()) ||
          "" ||
          job["isRemote"]
            ?.toLowerCase()
            .toString()
            .includes(query.toLowerCase()) ||
          "" ||
          job["jobType"]?.toLowerCase().includes(query.toLowerCase()) ||
          "" ||
          job["datePosted"]
            ?.toLowerCase()
            .toString()
            .includes(query.toLowerCase()) ||
          ""
      )
    );
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Job Searching</h1>
      <MultiInputSearchBar onSearch={filterJobs} />
      <SearchBar onSearch={queryJobs} query={query} updateQuery={updateQuery} />
      {isLoading ? (
        <div className="main-component">
          <LoadingIndicator />
        </div>
      ) : (
        <PaginatedTable filteredData={filteredJobs} rowsPerPage={10} />
      )}
      <span>
        <i>
          Note: This will attempt to pull 20 job postings per site so not to
          overwhelm the websites. Add filters to get more specific job postings
        </i>
        <br />
        <i>
          Note: Results may not be perfect since it relies on another{" "}
          <a href="https://github.com/Bunsly/JobSpy">repository</a> but jobs are
          real
        </i>
      </span>
    </div>
  );
}

export default App;
