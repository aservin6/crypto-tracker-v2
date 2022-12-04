import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/UI/ErrorMessage";
import Loading from "../../components/UI/Loading";

const Coin = () => {
  const [coin, setCoin] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getCoin();
  }, []);

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loading />}
      {coin && <div>{coin.name}</div>}
    </div>
  );
};

export default Coin;
