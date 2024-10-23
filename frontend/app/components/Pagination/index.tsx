import React from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

export const Pagination = ({ page, setPage }: PaginationProps) => {
  return (
    <div className="flex justify-between p-4">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};
