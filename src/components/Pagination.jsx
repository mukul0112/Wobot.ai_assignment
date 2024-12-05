import React from "react";
import { LeftArrowIcon } from "./Icons";
import { RightArrowIcon } from "./Icons";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil((totalItems || 0) / itemsPerPage);

  return (
    <div className="pagination-main">
      <div className="pagination-sub">
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <LeftArrowIcon/>
      </button>
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <RightArrowIcon/>
      </button>
      </div>
    </div>
  );
};

export default Pagination;
