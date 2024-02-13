import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div className="pagination">
      <button
        key={currentPage + 1}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        tabIndex={0}
      >
        <i className="arrow">{"<"}</i>
      </button>
      <span>{`${currentPage} / ${totalPages}`}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="arrow">{">"}</i>
      </button>
    </div>
  );
};

export default Pagination;
