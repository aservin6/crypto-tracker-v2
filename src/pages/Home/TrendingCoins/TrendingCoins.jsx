import React, { useState, useEffect } from "react";
import Heading from "../../../components/UI/Heading";
import { MdOutlineTrendingUp } from "react-icons/md";
import Loading from "../../../components/UI/Loading";
import ErrorMessage from "../../../components/UI/ErrorMessage";
import axios from "axios";
import TrendingCoin from "./TrendingCoin";

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingCoins = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/search/trending`
        );
        setTrendingCoins(data.coins);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getTrendingCoins();
  }, []);

  return (
    <div>
      <Heading
        content={"Trending Coins"}
        icon={<MdOutlineTrendingUp className="w-8 h-8 text-blue-500" />}
      />
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-4">
        {trendingCoins &&
          trendingCoins.map((coin) => {
            return <TrendingCoin key={coin.item.id} coin={coin.item} />;
          })}
      </ul>
    </div>
  );
};

export default TrendingCoins;
