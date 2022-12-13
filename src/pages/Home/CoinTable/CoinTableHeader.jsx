import React from "react";

const CoinTableHeader = () => {
  return (
    <thead>
      <tr className="font-semibold text-black border-black text-opacity-70 dark:text-white dark:text-opacity-70 bg-neutral-50 dark:bg-neutral-800 border-y border-opacity-10 dark:border-white dark:border-opacity-20 h-[2.8125rem]">
        <th className="sticky top-0 bg-neutral-50 dark:bg-neutral-800"></th>
        <th className="sticky top-0 text-left bg-neutral-50 dark:bg-neutral-800">
          #
        </th>
        <th className="sticky top-0 text-left bg-neutral-50 dark:bg-neutral-800">
          Coin
        </th>
        <th className="sticky top-0 text-left bg-neutral-50 dark:bg-neutral-800">
          Price
        </th>
        <th className="sticky top-0 text-right bg-neutral-50 dark:bg-neutral-800">
          24h
        </th>
        <th className="sticky top-0 text-right bg-neutral-50 dark:bg-neutral-800">
          24h Volume
        </th>
        <th className="sticky top-0 pr-5 text-right bg-neutral-50 dark:bg-neutral-800">
          Market Cap
        </th>
      </tr>
    </thead>
  );
};

export default CoinTableHeader;
