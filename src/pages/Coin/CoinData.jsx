import React, { useState } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";

const CoinData = ({ coin, handleAddToPortfolio }) => {
  const [description, setDescription] = useState(
    coin.description.en.split(". ")[0]
  );
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    if (showMore) {
      setDescription(coin.description.en.split(". ")[0]);
      setShowMore(false);
    } else {
      setDescription(coin.description.en);
      setShowMore(true);
    }
  };
  return (
    <>
      <div className="flex flex-col w-full mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex px-2 py-0.5 text-sm text-white rounded-md bg-neutral-800 w-fit">
            Rank #{coin.market_cap_rank}
          </div>
        </div>

        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-3">
            <img
              className="w-8"
              src={coin.image.small}
              alt={`${coin.name} icon`}
            />
            <div className="flex items-start flex-col md:flex-row md:items-center md:gap-3">
              <span className="text-lg md:text-2xl font-bold">{coin.name}</span>
              <span className="text-sm md:text-lg font-semibold text-neutral-500 dark:text-neutral-400">
                {coin.symbol.toUpperCase()}
              </span>
            </div>
          </div>
          <button
            onClick={handleAddToPortfolio}
            className="flex whitespace-nowrap items-center justify-center gap-1 bg-blue-500 hover:bg-blue-400 text-white drop-shadow rounded-md text-sm px-3 py-1.5 font-semibold md:w-auto md:px-5"
          >
            <MdAddCircle />
            Add to Portfolio
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold">
            ${coin.market_data.current_price.usd}
          </span>
          {coin.market_data.price_change_percentage_24h && (
            <div
              className={`flex items-center space-x-1 text-lg ${
                coin.market_data.price_change_percentage_24h.toFixed(2) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coin.market_data.price_change_percentage_24h > 0 ? (
                <AiFillCaretUp />
              ) : (
                <AiFillCaretDown />
              )}
              {coin.market_data.price_change_percentage_24h && (
                <span className="font-semibold">
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-400">
          <span>{coin.market_data.current_price.btc} BTC</span>
          <span
            className={`${
              coin.market_data.price_change_percentage_24h_in_currency.btc > 0
                ? "text-green-500"
                : "text-red-500"
            } flex items-center`}
          >
            {coin.market_data.price_change_percentage_24h_in_currency.btc.toFixed(
              2
            )}
            %
            {coin.market_data.price_change_percentage_24h_in_currency.btc >
            0 ? (
              <AiFillCaretUp />
            ) : (
              <AiFillCaretDown />
            )}
          </span>
        </div>
      </div>

      <div className="grid text-[13px] self-start w-full lg:grid-cols-2 lg:gap-x-4 max-w-4xl">
        <div className="flex items-center justify-between py-2 border-b border-black dark:border-white dark:border-opacity-20 border-opacity-20">
          <span className="opacity-70">Market Cap</span>
          <span>${coin.market_data.market_cap.usd.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-black dark:border-white dark:border-opacity-20 border-opacity-20">
          <span className="opacity-70">Circulating Supply</span>
          <span>{coin.market_data.circulating_supply.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-black dark:border-white dark:border-opacity-20 border-opacity-20">
          <span className="opacity-70">24 Hour Trading Vol</span>
          <span>${coin.market_data.total_volume.usd.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-black dark:border-white dark:border-opacity-20 border-opacity-20">
          <span className="opacity-70">Total Supply</span>
          {coin.market_data.total_supply === null ? (
            <span>Infinite</span>
          ) : (
            <span>{coin.market_data.total_supply.toLocaleString()}</span>
          )}
        </div>
        <div className="flex items-center justify-between py-2 border-b border-black dark:border-white dark:border-opacity-20 border-opacity-20 lg:col-start-2">
          <span className="opacity-70">Max Supply</span>
          {!coin.market_data.max_supply ? (
            <span>Infinite</span>
          ) : (
            <span>{coin.market_data.max_supply.toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className="w-full max-w-4xl pb-2 mt-8 text-sm border-b border-black md:text-base dark:border-white dark:border-opacity-20 border-opacity-20">
        {showMore ? (
          <>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <button
              className="mt-2 text-xs text-blue-500 md:text-sm hover:underline"
              onClick={handleClick}
            >
              Show Less
            </button>
          </>
        ) : (
          <>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: description + "..." }}
            />
            <button
              className="mt-2 text-xs text-blue-500 md:text-sm hover:underline"
              onClick={handleClick}
            >
              Show More
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CoinData;
