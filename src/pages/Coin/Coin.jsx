import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/UI/ErrorMessage";
import Loading from "../../components/UI/Loading";
import TransactionContext from "../../store/transaction-context";
import CoinChart from "./CoinChart";
import CoinData from "./CoinData";

const Coin = ({ setShowTransactionModal }) => {
  const [coin, setCoin] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setSelectedCoin } = useContext(TransactionContext);
  const openModal = () => setShowTransactionModal(true);

  const selectCoin = () => setSelectedCoin(coin.id);
  const handleAddToPortfolio = () => {
    openModal();
    selectCoin();
  };

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
      {coin && (
        <>
          <CoinData coin={coin} handleAddToPortfolio={handleAddToPortfolio} />
          <CoinChart coin={coin} />
        </>
      )}
    </div>
  );
};

export default Coin;
