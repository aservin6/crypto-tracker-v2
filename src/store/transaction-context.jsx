import React, { useState, createContext, useContext } from "react";
import UserContext from "./auth-context";
import { update, ref } from "firebase/database";
import { database } from "../utils/firebase";
import { useEffect } from "react";
import axios from "axios";

const TransactionContext = createContext({
  transactions: [],
  portfolio: [],
  portfolioValue: 0,
  originalPortfolioValue: 0,
  selectedCoin: null,
  setPortfolioValue: () => {},
  setSelectedCoin: () => {},
  setTransactions: () => {},
  addTransactionToDb: () => {},
  setPortfolio: () => {},
});

export const TransactionContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [originalPortfolioValue, setOriginalPortfolioValue] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { user } = useContext(UserContext);

  const addTransactionToDb = (transaction) => {
    const uid = user.uid;
    if (!transactions) {
      update(ref(database, `users/${uid}`), {
        transactions: [transaction],
      });
    } else {
      update(ref(database, `users/${uid}`), {
        transactions: [transaction, ...transactions],
      });
    }
  };

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      return;
    }
    const portfolioValues = transactions.reduce((acc, curr) => {
      return [
        {
          coin_id: curr.coin_id,
          coin_name: curr.coin_name,
          coin_symbol: curr.coin_symbol,
          coin_image: curr.coin_image,
          quantity: parseInt(curr.quantity),
          current_price: curr.current_price,
        },
        ...acc,
      ];
    }, []);

    const portfolioArray = portfolioValues.reduce((acc, curr) => {
      acc[curr.coin_id]
        ? (acc[curr.coin_id].quantity += curr.quantity)
        : (acc[curr.coin_id] = curr);
      return acc;
    }, []);
    const output = Object.values(portfolioArray);

    const originalPortfolioValueReducer = transactions.reduce((acc, curr) => {
      return (acc += curr.quantity * curr.price_per_coin);
    }, 0);

    setPortfolio(output);
    setOriginalPortfolioValue(originalPortfolioValueReducer);
  }, [transactions]);

  useEffect(() => {
    portfolio.forEach(async (coin) => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.coin_id}?localization=true&tickers=false&community_data=false&developer_data=false&sparkline=false`
      );
      coin.current_price = data.market_data.current_price.usd;
      const portfolioValueReducer = portfolio.reduce((acc, curr) => {
        return (acc += curr.quantity * curr.current_price);
      }, 0);
      setPortfolioValue(portfolioValueReducer);
    });
  }, [portfolio]);

  return (
    <TransactionContext.Provider
      value={{
        transactions: transactions,
        portfolio: portfolio,
        portfolioValue: portfolioValue,
        setPortfolioValue: setPortfolioValue,
        originalPortfolioValue: originalPortfolioValue,
        selectedCoin: selectedCoin,
        setSelectedCoin: setSelectedCoin,
        setTransactions: setTransactions,
        addTransactionToDb: addTransactionToDb,
        setPortfolio: setPortfolio,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
