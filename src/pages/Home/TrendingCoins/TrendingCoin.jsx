import React from "react";

const TrendingCoin = ({ coin }) => {
  return (
    <a href={`/coins/${coin.id}`}>
      <div className="flex items-center justify-center py-3 bg-white rounded-md drop-shadow dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700">
        <img src={coin.thumb} alt={`${coin.name}`} className="w-5 h-5 mr-2" />
        <span className="text-sm font-semibold dark:text-neutral-300">
          {coin.symbol}
        </span>
      </div>
    </a>
  );
};

export default TrendingCoin;
