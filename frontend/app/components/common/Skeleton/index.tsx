import React from 'react';
export const Skeleton = () => {
  return (
    <div
      className={`mx-2 flex justify-between items-center bg-project-gray-card px-2 py-4 cursor-pointer hover:bg-project-gray-title"
      }`}
    >
      <p>Ainda não há rádios nos favoritos</p>
    </div>
  );
}
