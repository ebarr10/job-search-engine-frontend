import React, { useState } from "react";
import "./paginated-table.styles.css";

export function PaginatedTable({ filteredData, rowsPerPage = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Get the current rows to display
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {/* Table */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th className="column-header">Site</th>
            <th className="column-header">Title</th>
            <th className="column-header">Company</th>
            <th className="column-header">Location</th>
            <th className="column-header">Is Remote</th>
            <th className="column-header">Job Type</th>
            <th className="column-header">Date Posted</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>{row.site}</td>
              <td>
                <a href={row.job_url} target="_blank" rel="noreferrer">
                  {row.title}
                </a>
              </td>
              <td>
                <a
                  href={row.company_url || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  {row.company}
                </a>
              </td>
              <td>{row.location || "Check Job Posting"}</td>
              <td>{row.is_remote ? "Yes" : "No"}</td>
              <td>{row.job_type || "fulltime"}</td>
              <td>{row.date_posted || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
