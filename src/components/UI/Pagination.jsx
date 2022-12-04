import React from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center py-5">
      <button
        onClick={() => setPage(parseInt(page) - 1)}
        className="py-1 px-2 bg-neutral-200 dark:bg-neutral-800 rounded-l-md"
        value={page}
      >
        <BsChevronDoubleLeft />
      </button>
      <div
        className="py-1 px-2 bg-neutral-200 dark:bg-neutral-800"
        value={page}
      >
        {page}
      </div>
      <button
        onClick={() => setPage(parseInt(page) + 1)}
        className="py-1 px-2 bg-neutral-200 dark:bg-neutral-800 rounded-r-md"
        value={page}
      >
        <BsChevronDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
