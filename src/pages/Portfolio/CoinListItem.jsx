import React from "react";
import { FaChevronRight } from "react-icons/fa";

const TransactionCoinOption = ({ coin, setSelectedCoin }) => {
  
  const selectCoin = () => {
    setSelectedCoin(coin);
  };

  return (
    <button
      onClick={selectCoin}
      className="flex justify-between items-center w-full h-12 rounded-md px-3 hover:bg-neutral-100 dark:hover:bg-neutral-700"
    >
      <div className="flex items-center gap-2 w-full">
        <span>
          <img className="w-6 h-6" src={coin.image} alt="" />
        </span>
        <span className="font-semibold">{coin.name}</span>
        <span className="font-semibold text-neutral-500 dark:text-neutral-400">
          {coin.symbol.toUpperCase()}
        </span>
      </div>
      <FaChevronRight />
    </button>
  );
};

export default TransactionCoinOption;
