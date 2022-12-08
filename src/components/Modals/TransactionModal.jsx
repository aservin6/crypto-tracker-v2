import React, { useState, useEffect, useContext } from "react";
import ModalWrapper from "./ModalWrapper";
import CloseModalButton from "./CloseModalButton";
import axios from "axios";
import CurrencyContext from "../../store/currency-context";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import CoinListItem from "../../pages/Portfolio/CoinListItem";
import TransactionScreen from "../../pages/Portfolio/TransactionScreen";
import { CgSearch } from "react-icons/cg";
import SearchInput from "../UI/SearchInput";

const TransactionModal = ({
  showTransactionModal,
  setShowTransactionModal,
}) => {
  const [coinListData, setCoinListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [selectedCoin, setSelectedCoin] = useState(null);

  const closeModal = () => setShowTransactionModal(false);
  const { selectedCurrency } = useContext(CurrencyContext);

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
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
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
          <div className="flex items-center h-full mb-2">
            <div className="py-3 pl-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded-l-md">
              <CgSearch />
            </div>
            <SearchInput onChange={(e) => setSearch(e.target.value)} />
          </div>
          {isLoading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {!selectedCoin && (
            <ul className="h-full overflow-y-auto hide-scrollbar max-h-[24rem]">
              {handleSearch().map((coin) => {
                return (
                  <CoinListItem
                    key={coin.id}
                    coin={coin}
                    setSelectedCoin={setSelectedCoin}
                  />
                );
              })}
            </ul>
          )}
          {selectedCoin && <TransactionScreen selectedCoin={selectedCoin} />}
        </ModalWrapper>
      )}
    </>
  );
};

export default TransactionModal;
