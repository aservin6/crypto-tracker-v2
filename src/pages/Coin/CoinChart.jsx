import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/UI/Loading";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const CoinChart = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = (e) => {
    setDays(e.target.value);
  };

  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=USD&days=${days}`
        );
        setHistoricalData(data.prices);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getHistoricalData();
  }, [days, coin.id]);

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {historicalData && (
        <div className="w-full pb-8 mt-8 md:max-w-4xl">
          <div className="flex items-center mb-4">
            <button
              className={`${
                days == 1
                  ? "bg-neutral-100 dark:bg-neutral-700 text-blue-500"
                  : "dark:bg-neutral-800"
              } py-1 px-2 font-semibold border border-black dark:border-white dark:border-opacity-10 border-opacity-20 rounded-l-md`}
              onClick={handleClick}
              value={1}
            >
              1D
            </button>
            <button
              className={`${
                days == 7
                  ? "bg-neutral-100 dark:bg-neutral-700 text-blue-500"
                  : "dark:bg-neutral-800"
              } py-1 px-2 border-r border-y border-black dark:border-white dark:border-opacity-10 border-opacity-20 font-semibold`}
              onClick={handleClick}
              value={7}
            >
              7D
            </button>
            <button
              className={`${
                days == 30
                  ? "bg-neutral-100 dark:bg-neutral-700 text-blue-500"
                  : "dark:bg-neutral-800"
              } py-1 px-2 border-r border-y border-black dark:border-white dark:border-opacity-10 border-opacity-20 font-semibold`}
              onClick={handleClick}
              value={30}
            >
              1M
            </button>
            <button
              className={`${
                days == 90
                  ? "bg-neutral-100 dark:bg-neutral-700 text-blue-500"
                  : "dark:bg-neutral-800"
              } py-1 px-2 border-r border-y border-black dark:border-white dark:border-opacity-10 border-opacity-20 font-semibold`}
              onClick={handleClick}
              value={90}
            >
              3M
            </button>
            <button
              className={`${
                days == 180
                  ? "bg-neutral-100 dark:bg-neutral-700 text-blue-500"
                  : "dark:bg-neutral-800"
              } py-1 px-2 border-r border-y border-black dark:border-white dark:border-opacity-10 border-opacity-20 font-semibold`}
              onClick={handleClick}
              value={180}
            >
              6M
            </button>
            <button
              className={`${
                days == 365
                  ? "bg-neutral-100 dark:bg-neutral-700 text-blue-500"
                  : "dark:bg-neutral-800"
              } py-1 px-2 border-r border-y border-black dark:border-white dark:border-opacity-10 border-opacity-20 font-semibold rounded-r-md`}
              onClick={handleClick}
              value={365}
            >
              1YR
            </button>
          </div>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days == 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in USD`,
                  borderColor: "#3b82f6",
                  fill: true,
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default CoinChart;
