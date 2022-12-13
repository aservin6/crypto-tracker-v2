import React from "react";

const PortfolioTableHead = () => {
  return (
    <thead>
      <tr className="font-semibold text-black border-black text-opacity-70 dark:text-white dark:text-opacity-70 bg-neutral-50 dark:bg-neutral-800 border-y border-opacity-10 dark:border-white dark:border-opacity-20 h-[2.8125rem]">
        <th className="pl-5 text-left bg-neutral-50 dark:bg-neutral-800">
          Name
        </th>
        <th className="text-left bg-neutral-50 dark:bg-neutral-800">
          Current Price
        </th>
        <th className="text-left bg-neutral-50 dark:bg-neutral-800">24h</th>
        <th className="text-right bg-neutral-50 dark:bg-neutral-800">
          Holdings
        </th>
        <th className="pr-5 bg-neutral-50 dark:bg-neutral-800"></th>
      </tr>
    </thead>
  );
};

export default PortfolioTableHead;
