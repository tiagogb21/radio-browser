import React from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

export const Pagination = ({ page, setPage }: PaginationProps) => {
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className={`px-4 py-2 rounded-lg transition-all duration-200 
          ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        {`<`}
      </button>
      <span className="text-lg font-semibold">Page {page}</span>
      <button
        onClick={handleNextPage}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
      >
        {`>`}
      </button>
    </div>
  );
};
