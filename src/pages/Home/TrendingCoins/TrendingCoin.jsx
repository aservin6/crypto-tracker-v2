import React from "react";
import { Link } from "react-router-dom";

const TrendingCoin = ({ coin }) => {
  return (
    <Link to={`/coins/${coin.id}`}>
      <div className="flex items-center justify-center py-3 bg-white rounded-md drop-shadow dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700">
        <img src={coin.thumb} alt={`${coin.name}`} className="w-5 h-5 mr-2" />
        <span className="text-sm font-semibold dark:text-neutral-300">
          {coin.symbol}
        </span>
      </div>
    </Link>
  );
};

export default TrendingCoin;
