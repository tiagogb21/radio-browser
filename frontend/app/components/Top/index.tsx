import { FaSearch } from "react-icons/fa";

interface ITopProps {
  search: string;
  setSearch: (value: string) => void;
}

export const Top = ({search, setSearch} : ITopProps) => {
  return (
    <div className="flex flex-col text-gray-100">
      <h1 className="text-center text-[1.75rem]">Radio Browser</h1>
      <div className="flex justify-between">
        <p className="uppercase">Favorite Radios</p>
        <div className="hidden lg:flex items-center gap-1">
          <FaSearch className="text-project-blue-icon" />
          <input
            className="w-32 bg-inherit placeholder:text-white"
            type="text"
            placeholder="Search stations"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
