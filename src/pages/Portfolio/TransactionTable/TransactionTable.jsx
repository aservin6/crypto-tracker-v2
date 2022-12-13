import React, { useState } from "react";
import TransactionRow from "./TransactionRow";
import TransactionTableHead from "./TransactionTableHead";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

const TransactionTable = ({ transactions }) => {
  const [showTable, setShowTable] = useState(false);
  return (
    <>
      <button
        onClick={() => (showTable ? setShowTable(false) : setShowTable(true))}
        className="flex gap-2 items-center hover:opacity-50 md:mb-1 mt-3"
      >
        <h3 className="font-semibold md:text-xl dark:text-neutral-200 text-neutral-800">
          Transaction List
        </h3>
        {showTable ? <CgChevronUp className="w-6 h-6" /> : <CgChevronDown className="w-6 h-6" />}
        
      </button>
      {showTable && (
        <table className="relative w-full transition-all">
          <TransactionTableHead />
          <tbody>
            {transactions.map((transaction) => {
              return (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TransactionTable;
