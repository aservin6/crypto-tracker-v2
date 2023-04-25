import { useState, useContext, useEffect } from "react";
import Heading from "../../UI/Heading";
import TransactionContext from "../../../store/transaction-context";
import { uuidv4 } from "@firebase/util";
import axios from "axios";
import Loading from "../../UI/Loading";
import ErrorMessage from "../../UI/ErrorMessage";

const TransactionScreen = ({ selectedCoin, setShowTransactionModal }) => {
  const { transactions, setTransactions, addTransactionToDb } =
    useContext(TransactionContext);
  const closeModal = () => setShowTransactionModal(false);

  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(0);
  const [pricePerCoin, setPricePerCoin] = useState(0);

  const transactionTotal = quantity * pricePerCoin;
  const [transactionType, setTransactionType] = useState(true);

  const setToBuy = () => setTransactionType(true);
  const setToSell = () => setTransactionType(false);

  useEffect(() => {
    const getSelectedCoinData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
        setSelectedCoinData(data);
        setPricePerCoin(data.market_data.current_price.usd);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getSelectedCoinData();
  }, []);

  const handleAddTransaction = () => {
    const transaction = {
      coin_name: selectedCoinData.name,
      coin_id: selectedCoinData.id,
      coin_symbol: selectedCoinData.symbol,
      coin_image: selectedCoinData.image.small,
      quantity: parseInt(quantity),
      price_per_coin: transactionType ? pricePerCoin : pricePerCoin * -1,
      current_price: selectedCoinData.market_data.current_price.usd,
      total: transactionTotal,
      type: transactionType ? "Buy" : "Sell",
      id: uuidv4(),
    };
    if (!transactions) {
      setTransactions([transaction]);
    } else {
      setTransactions([transaction, ...transactions]);
    }
    
    addTransactionToDb(transaction);
    closeModal();
  };

  return (
    <>
      <Heading content={"Add Transaction"} />
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {selectedCoinData && (
        <>
          <div className="flex justify-center font-semibold bg-blue-500 rounded-md">
            <button
              onClick={setToBuy}
              className={`${
                transactionType && `text-white bg-blue-500 dark:bg-blue-500`
              } bg-white dark:text-white dark:bg-neutral-800 rounded-md border border-blue-500 w-full py-1`}
            >
              Buy
            </button>
            <button
              onClick={setToSell}
              className={`${
                !transactionType && `text-white bg-blue-500 dark:bg-blue-500`
              } bg-white dark:text-white dark:bg-neutral-800 rounded-md border border-blue-500 w-full py-1`}
            >
              Sell
            </button>
          </div>
          <div className="flex items-center gap-2 my-4 font-semibold">
            <img
              src={selectedCoinData.image.small}
              alt={`${selectedCoinData.name}`}
              className="w-7 h-7"
            />
            <span>{selectedCoinData.name}</span>
            <span className="text-neutral-500 dark:text-neutral-400">
              {selectedCoinData.symbol.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-8">
            <div className="w-full">
              <label className="font-semibold">Quantity</label>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                name="Quantity"
                id="quantity"
                placeholder="0.00"
                min="0"
                className="bg-neutral-100 dark:bg-neutral-700 w-full px-2 py-1 text-neutral-900 dark:text-white rounded-md outline-none"
              />
            </div>
            <div className="w-full">
              <label className="font-semibold">Price Per Coin</label>
              <input
                onChange={(e) => setPricePerCoin(e.target.value)}
                type="number"
                name="PricePerCoin"
                id="price-per-coin"
                min="0"
                className="bg-neutral-100 dark:bg-neutral-700 w-full px-2 py-1 text-neutral-900 dark:text-white rounded-md outline-none"
                defaultValue={
                  selectedCoinData.market_data.current_price.usd
                }
              />
            </div>
          </div>
          <div className="mt-8">
            <div>
              <h3 className="font-semibold text-lg">
                {transactionType ? "Total Spent" : "Total Received"}
              </h3>
              <div className="bg-neutral-100 dark:bg-neutral-700 rounded-md py-2 px-2 text-lg font-semibold">
                ${transactionTotal.toLocaleString()}
              </div>
            </div>
            <div className="my-4">
              <button
                onClick={handleAddTransaction}
                className="bg-blue-500 text-white rounded-md py-2 font-semibold w-full hover:bg-blue-400"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TransactionScreen;
