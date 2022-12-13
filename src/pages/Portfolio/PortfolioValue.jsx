import React, { useContext } from "react";
import TransactionContext from "../../store/transaction-context";
import { MdAddCircle } from "react-icons/md";

const PortfolioValue = ({ openModal }) => {
  const { portfolioValue, originalPortfolioValue } =
    useContext(TransactionContext);

  const portfolioProfitLoss = portfolioValue - originalPortfolioValue;

  return (
    <>
      <div className="mt-5 font-semibold text-neutral-500 dark:text-neutral-400">
        Current Balance
      </div>
      <div className="flex flex-col items-center justify-between pb-5 md:flex-row">
        <div className="flex flex-col leading-none">
          <span className="py-2 self-start text-3xl font-bold rounded-md w-fit">
            ${portfolioValue.toLocaleString()}
          </span>
          {portfolioProfitLoss > 0 ? (
            <span className="text-green-500 font-semibold">
              +${portfolioProfitLoss.toLocaleString()}
            </span>
          ) : (
            <span className="text-red-500 font-semibold">
              -${(portfolioProfitLoss * -1).toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={openModal}
          className="flex whitespace-nowrap items-center justify-center gap-1 bg-blue-500 hover:bg-blue-400 text-white drop-shadow rounded-md px-2 py-1.5 font-semibold w-full md:w-auto md:px-5"
        >
          <MdAddCircle />
          Add Transaction
        </button>
      </div>
    </>
  );
};

export default PortfolioValue;
