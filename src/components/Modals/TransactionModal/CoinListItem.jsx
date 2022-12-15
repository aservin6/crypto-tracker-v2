import React, { useContext } from "react";
import { FaChevronRight } from "react-icons/fa";
import TransactionContext from "../../../store/transaction-context";

const TransactionCoinOption = ({ coin }) => {
  const { setSelectedCoin } = useContext(TransactionContext);

  const selectCoin = () => {
    setSelectedCoin(coin.id);
  };

  return (
    <button
      onClick={selectCoin}
      className="flex items-center justify-between w-full h-12 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
    >
      <div className="flex items-center w-full gap-2">
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
