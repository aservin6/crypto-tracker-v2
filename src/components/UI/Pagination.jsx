import React from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center py-5">
      <button
        onClick={() => {
          if (parseInt(page) - 5 <= 0) {
            setPage(1);
          } else {
            setPage(parseInt(page) - 5);
          }
        }}
        className="py-1 px-2 bg-neutral-200 dark:bg-neutral-800 rounded-l-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
        value={page}
        aria-label="go back 5 pages"
      >
        <BsChevronDoubleLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          if (parseInt(page) - 1 <= 0) {
            setPage(1);
          } else {
            setPage(parseInt(page) - 1);
          }
        }}
        className="flex items-center text-[13px] py-1 pr-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        value={page}
        aria-label="go back 1 page"
      >
        <RiArrowDropLeftLine className="w-5 h-5" />
        <span>Prev</span>
      </button>
      <div
        className="flex justify-center py-1 px-2 bg-neutral-200 dark:bg-neutral-800 h-8 w-8"
        value={page}
      >
        <span>{page}</span>
      </div>
      <button
        onClick={() => setPage(parseInt(page) + 1)}
        className="flex items-center text-[13px] py-1 pl-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        value={page}
        aria-label="go forward 1 page"
      >
        <span>Next</span>
        <RiArrowDropRightLine className="w-5 h-5" />
      </button>
      <button
        onClick={() => setPage(parseInt(page) + 5)}
        className="py-1 px-2 bg-neutral-200 dark:bg-neutral-800 rounded-r-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
        value={page}
        aria-label="go forward 5 pages"
      >
        <BsChevronDoubleRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
