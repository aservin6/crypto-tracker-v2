import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({ page, setPage }) => {
  function handleChangePage(increment) {
    page + increment < 1 ? setPage(1) : setPage(page + increment);
  }

  return (
    <div className="flex justify-center py-5 [&>*]:border [&>*]:border-neutral-300 [&>*]:dark:border [&>*]:dark:border-neutral-700">
      <button
        onClick={() => handleChangePage(-5)}
        className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-l-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
        aria-label="go back 5 pages"
      >
        <BsChevronDoubleLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleChangePage(-1)}
        className="flex items-center text-[13px] py-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        aria-label="go back 1 page"
      >
        <span className="px-2">Prev</span>
      </button>
      <div className="flex select-none items-center justify-center w-8 h-8 px-2 py-1 bg-neutral-200 dark:bg-neutral-800">
        <span>{page}</span>
      </div>
      <button
        onClick={() => handleChangePage(1)}
        className="flex items-center text-[13px] py-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        aria-label="go forward 1 page"
      >
        <span className="px-2">Next</span>
      </button>
      <button
        onClick={() => handleChangePage(5)}
        className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-r-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
        aria-label="go forward 5 pages"
      >
        <BsChevronDoubleRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
