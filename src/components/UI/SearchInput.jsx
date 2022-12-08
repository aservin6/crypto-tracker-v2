import React from "react";

const SearchInput = ({ onChange }) => {
  return (
    <input
      onChange={onChange}
      className={`w-full px-3 py-2 border-none rounded-r-md bg-neutral-100 dark:bg-neutral-700 focus:outline-none text-neutral-900 dark:text-white`}
      type="text"
      placeholder="Search"
    />
  );
};

export default SearchInput;
