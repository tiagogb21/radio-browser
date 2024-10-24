import React from 'react';

interface SearchBarProps {
  radioSearch: string;
  setRadioSearch: (value: string) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

export const SearchBar = ({
  radioSearch,
  setRadioSearch,
  searchFilter,
  setSearchFilter,
}: SearchBarProps) => {
  return (
    <div className="mx-4 bg-project-gray-card rounded-lg flex items-center gap-1 mb-4 p-2">
      <select
        className="rounded-lg bg-inherit text-white"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        aria-label="search"
      >
        <option value="name">Name</option>
        <option value="country">Country</option>
        <option value="language">Language</option>
      </select>

      <input
        className="rounded-lg w-full bg-inherit placeholder:text-white ml-2 flex-1"
        data-testid="search-radios"
        type="text"
        placeholder={`Search by ${searchFilter}`}
        value={radioSearch}
        onChange={(e) => setRadioSearch(e.target.value)}
      />
    </div>
  );
};
