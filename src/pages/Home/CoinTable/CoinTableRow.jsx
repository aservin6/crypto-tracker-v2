import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../../../components/UI/FavoriteButton";

const CoinTableRow = ({
  coin,
  currency,
  favorites,
  setFavorites,
  setShowLoginModal,
}) => {
  return (
    <tr className="border-b border-opacity-10 dark:border-white dark:border-opacity-20 h-[3.75rem]">
      <td>
        <FavoriteButton
          coin={coin}
          favorites={favorites}
          setFavorites={setFavorites}
          setShowLoginModal={setShowLoginModal}
        />
      </td>
      <td className="text-left">{coin.market_cap_rank}</td>
      <td className="min-w-[11rem]">
        <div className="flex items-center text-left whitespace-nowrap">
          <div className="mr-2 overflow-hidden">
            <img className="w-5" src={coin.image} alt={coin.name} />
          </div>
          <div>
            <Link
              className="flex flex-col md:items-center md:flex-row hover:underline"
              to={`/coins/${coin.id}`}
            >
              <span className="font-bold">{coin.name}</span>
              <span className="ml-0 text-xs text-neutral-600 dark:text-neutral-400 md:ml-2">
                {coin.symbol.toUpperCase()}
              </span>
            </Link>
          </div>
        </div>
      </td>
      <td className="text-left min-w-[5rem]">
        {currency === "usd" ? (
          <span>${coin.current_price}</span>
        ) : (
          <span>
            {coin.current_price} {currency.toUpperCase()}
          </span>
        )}
      </td>
      {coin.price_change_percentage_24h ? (
        <td
          className={`text-right min-w-[5rem] ${
            coin.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(1)}%
        </td>
      ) : (
        <td className="text-right ">null</td>
      )}

      <td className="text-right min-w-[11rem]">
        {currency === "usd" ? (
          <span>${coin.total_volume.toLocaleString()}</span>
        ) : (
          <span>
            {coin.total_volume.toLocaleString()} {currency.toUpperCase()}
          </span>
        )}
      </td>
      <td className="pr-5 text-right min-w-[11rem]">
        {currency === "usd" ? (
          <span>${coin.market_cap.toLocaleString()}</span>
        ) : (
          <span>
            {coin.market_cap.toLocaleString()} {currency.toUpperCase()}
          </span>
        )}
      </td>
    </tr>
  );
};

export default CoinTableRow;
