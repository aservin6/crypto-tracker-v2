import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import CurrencyContext from "../../store/currency-context";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

const MarketOverview = () => {
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currencyCtx = useContext(CurrencyContext);

  useEffect(() => {
    setIsLoading(true);
    const getMarketData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/global"
        );
        const data = response.data.data;
        setMarketData(data);
        setIsLoading(false);
      } catch (err) {
        let message = "Unknown Error";
        if (err instanceof Error) message = err.message;
        setError(message);
        setIsLoading(false);
      }
    };
    getMarketData();
  }, [currencyCtx.selectedCurrency]);

  return (
    <div className="relative w-full py-2 overflow-x-scroll border-black whitespace-nowrap border-y border-opacity-30 dark:border-white dark:border-opacity-30 md:border-none md:overflow-auto">
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {marketData && (
        <div className="flex items-center text-[11px]">
          <div className="mr-3">
            <span className="text-gray-600 dark:text-white dark:text-opacity-60">
              Coins:{" "}
            </span>
            <span className="text-blue-500">
              {marketData.active_cryptocurrencies.toLocaleString()}
            </span>
          </div>
          <div className="mr-3">
            <span className="text-gray-600 dark:text-white dark:text-opacity-60">
              Exchanges:{" "}
            </span>
            <span className="text-blue-500">{marketData.markets}</span>
          </div>
          <div className="flex mr-3">
            <span className="mr-1 text-gray-600 dark:text-white dark:text-opacity-60">
              Market Cap:{" "}
            </span>
            <span className="flex">
              {currencyCtx.selectedCurrency === "usd" ? (
                <span className="mr-1 text-blue-500">
                  $
                  {parseInt(
                    marketData.total_market_cap[
                      currencyCtx.selectedCurrency
                    ].toFixed()
                  ).toLocaleString()}
                </span>
              ) : (
                <span className="mr-1 text-blue-500">
                  {parseInt(
                    marketData.total_market_cap[
                      currencyCtx.selectedCurrency
                    ].toFixed()
                  ).toLocaleString()}{" "}
                  {currencyCtx.selectedCurrency.toUpperCase()}
                </span>
              )}
              {marketData.market_cap_change_percentage_24h_usd > 0 ? (
                <span className="flex items-center text-green-500">
                  <span>
                    {marketData.market_cap_change_percentage_24h_usd.toFixed(1)}
                    %
                  </span>
                  <AiFillCaretUp />
                </span>
              ) : (
                <span className="flex items-center text-red-500">
                  <span>
                    {marketData.market_cap_change_percentage_24h_usd.toFixed(1)}
                    %
                  </span>
                  <AiFillCaretDown />
                </span>
              )}
            </span>
          </div>
          <div className="mr-3">
            <span className="text-gray-600 dark:text-white dark:text-opacity-60">
              24h Vol:{" "}
            </span>
            {currencyCtx.selectedCurrency === "usd" ? (
              <span className="mr-1 text-blue-500">
                $
                {parseInt(
                  marketData.total_volume[
                    currencyCtx.selectedCurrency
                  ].toFixed()
                ).toLocaleString()}
              </span>
            ) : (
              <span className="mr-1 text-blue-500">
                {parseInt(
                  marketData.total_volume[
                    currencyCtx.selectedCurrency
                  ].toFixed()
                ).toLocaleString()}{" "}
                {currencyCtx.selectedCurrency.toUpperCase()}
              </span>
            )}
          </div>
          <div className="mr-1">
            <span className="text-gray-600 dark:text-white dark:text-opacity-60">
              Dominance:{" "}
            </span>
          </div>
          <div className="mr-2">
            <span className="text-blue-500">
              BTC {marketData.market_cap_percentage.btc.toFixed(1)}%
            </span>
          </div>
          <div className="mr-2">
            <span className="text-blue-500">
              ETH {marketData.market_cap_percentage.eth.toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketOverview;
