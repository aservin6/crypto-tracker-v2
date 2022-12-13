import React, { useState, useEffect, useContext } from "react";
import ModalWrapper from "./ModalWrapper";
import CloseModalButton from "./CloseModalButton";
import axios from "axios";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import TransactionScreen from "../../pages/Portfolio/TransactionScreen";
import SelectCoinScreen from "../../pages/Portfolio/SelectCoinScreen";
import TransactionContext from "../../store/transaction-context";

const TransactionModal = ({
  showTransactionModal,
  setShowTransactionModal,
}) => {
  const [coinListData, setCoinListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

 const {selectedCoin, setSelectedCoin} = useContext(TransactionContext);

  const closeModal = () => setShowTransactionModal(false);

  const handleSearch = () => {
    return coinListData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    const getCoinListData = async () => {
      setError(null);
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        );
        setCoinListData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getCoinListData();
  }, []);

  useEffect(() => {
    if (!showTransactionModal) {
      setSelectedCoin(null);
    }
  }, [showTransactionModal]);

  return (
    <>
      {showTransactionModal && (
        <ModalWrapper>
          <CloseModalButton closeModal={closeModal} />
          
          {!selectedCoin && (
            <SelectCoinScreen
              handleSearch={handleSearch}
              setSearch={setSearch}
            />
          )}
          {isLoading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {selectedCoin && (
            <TransactionScreen selectedCoin={selectedCoin} setShowTransactionModal={setShowTransactionModal} />
          )}
        </ModalWrapper>
      )}
    </>
  );
};

export default TransactionModal;
