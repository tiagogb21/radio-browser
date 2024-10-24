import React, { useEffect, useState, useRef } from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  isFavorites?: boolean;
}

const itemsPerPage: number = 10;

export const Pagination = ({
  page,
  setPage,
  isFavorites = false,
}: PaginationProps) => {
  const [favoriteTotal, setFavoriteTotal] = useState<number>(0);

  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFavorites) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoriteTotal(favorites.length);
    }
  }, [isFavorites]);

  const totalPages = isFavorites ? Math.ceil(favoriteTotal / itemsPerPage) : Infinity;

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (paginationRef.current) {
      paginationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  return (
    <div ref={paginationRef} className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className={`px-4 py-2 rounded-lg transition-all duration-200
          ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        {`<`}
      </button>
      <span className="text-white text-lg font-semibold">
        {page} {isFavorites && `de ${totalPages}`}
      </span>
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-lg transition-all duration-200
          ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        {`>`}
      </button>
    </div>
  );
};
