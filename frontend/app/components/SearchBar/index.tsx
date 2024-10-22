interface SearchBarProps {
  radioSearch: string;
  setRadioSearch: (value: string) => void;
}

export const SearchBar = ({ radioSearch, setRadioSearch }: SearchBarProps) => {
  return (
    <div className="mx-4 bg-project-gray-card rounded-lg flex items-center gap-1 mb-4 p-2">
      <input
        className="rounded-lg bg-inherit placeholder:text-white"
        type="text"
        placeholder="Search here"
        value={radioSearch}
        onChange={(e) => setRadioSearch(e.target.value)}
      />
    </div>
  );
};
