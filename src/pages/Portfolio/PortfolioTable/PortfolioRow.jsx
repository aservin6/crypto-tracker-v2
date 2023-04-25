import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CurrencyContext from "../../../store/currency-context";
import { CgMathPlus } from "react-icons/cg";
import TransactionContext from "../../../store/transaction-context";
import Loading from "../../../components/UI/Loading";
import ErrorMessage from "../../../components/UI/ErrorMessage";

const PortfolioRow = ({ coin, openModal }) => {
  const [coinData, setCoinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCurrency } = useContext(CurrencyContext);
  const { setSelectedCoin } = useContext(TransactionContext);

  const selectCoin = () => setSelectedCoin(coin.coin_id);

  useEffect(() => {
    const getCoinData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin.coin_id}?localization=true&tickers=false&community_data=false&developer_data=false&sparkline=false`
        );
        setCoinData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getCoinData();
  }, []);

  return (
    <>
      {error && <ErrorMessage message={error} />}
      {coin && (
        <tr className="border-b border-opacity-10 dark:border-white dark:border-opacity-20 h-[3.75rem]">
          <td className="pl-5 text-left min-w-[11rem]">
            <div className="flex items-center text-left whitespace-nowrap">
              <div className="mr-2 overflow-hidden">
                <img
                  className="w-5"
                  src={coin.coin_image}
                  alt={coin.coin_name}
                />
              </div>
              <div>
                <Link
                  className="flex flex-col md:items-center md:flex-row hover:underline"
                  to={`/coins/${coin.coin_id}`}
                >
                  <span className="font-bold">{coin.coin_name}</span>
                  <span className="ml-0 text-xs text-neutral-600 dark:text-neutral-400 md:ml-2">
                    {coin.coin_symbol.toUpperCase()}
                  </span>
                </Link>
              </div>
            </div>
          </td>

          {coinData ? (
            <td className="min-w-[9rem]">
              {selectedCurrency === "usd"
                ? `$${coinData.market_data.current_price[
                    selectedCurrency
                  ].toLocaleString()}`
                : `${coinData.market_data.current_price[
                    selectedCurrency
                  ].toLocaleString()} ${selectedCurrency.toUpperCase()}`}{" "}
            </td>
          ) : (
            <td className="min-w-[9rem]">
              isLoading && <Loading />
            </td>
          )}
          {coinData ? (
            <td
              className={`min-w-[3rem] ${
                coinData.market_data.price_change_percentage_24h_in_currency[
                  selectedCurrency
                ] > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coinData.market_data.price_change_percentage_24h_in_currency[
                selectedCurrency
              ].toFixed(1)}
              %
            </td>
          ) : (
            <td className="min-w-[9rem]">
              isLoading && <Loading />
            </td>
          )}

          <td className="text-right min-w-[6rem]">{coin.quantity}</td>
          <td className="pr-5 text-right min-w-[6rem]">
            <button
              onClick={() => {
                openModal();
                selectCoin();
              }}
              aria-label={`add transaction for ${coin.id}`}
            >
              <CgMathPlus className="w-5 h-5 hover:opacity-60" />
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default PortfolioRow;
