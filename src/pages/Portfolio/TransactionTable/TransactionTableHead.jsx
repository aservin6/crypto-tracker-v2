import React from "react";

const TransactionTableHead = () => {
  return (
    <thead>
      <tr className="font-semibold text-black border-black text-opacity-70 dark:text-white dark:text-opacity-70 bg-neutral-50 dark:bg-neutral-800 border-y border-opacity-10 dark:border-white dark:border-opacity-20 h-[2.8125rem]">
        <th className="pl-5 text-left bg-neutral-50 dark:bg-neutral-800">
          Name
        </th>
        <th className="text-left bg-neutral-50 dark:bg-neutral-800">Type</th>
        <th className="text-right bg-neutral-50 dark:bg-neutral-800">
          Quantity
        </th>
        <th className="text-right bg-neutral-50 dark:bg-neutral-800 whitespace-nowrap">
          Buy/Sell Price
        </th>
        <th className="pr-5 text-right bg-neutral-50 dark:bg-neutral-800">
          Total
        </th>
        <th className="bg-neutral-50 dark:bg-neutral-800"></th>
      </tr>
    </thead>
  );
};

export default TransactionTableHead;
