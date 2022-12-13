import React from "react";
import { CgSearch } from "react-icons/cg";

const SearchBar = ({ onChange }) => {
  return (
    <div className="flex items-center rounded-md bg-neutral-100 dark:bg-neutral-700">
      <div className="py-3 pl-2 text-neutral-500 dark:text-neutral-400">
        <CgSearch />
      </div>
      <input
        onChange={onChange}
        className="w-full px-3 py-2 border-none rounded-r-md bg-neutral-100 dark:bg-neutral-700 focus:outline-none text-neutral-900 dark:text-white"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
