import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import CurrencyContext from "../../../store/currency-context";
import ErrorMessage from "../../../components/UI/ErrorMessage";
import Loading from "../../../components/UI/Loading";
import CoinTableRow from "./CoinTableRow";
import CoinTableHeader from "./CoinTableHeader";
import { onValue, ref } from "firebase/database";
import UserContext from "../../../store/auth-context";
import { database } from "../../../utils/firebase";

const CoinTable = ({ page, setShowLoginModal }) => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const { selectedCurrency } = useContext(CurrencyContext);
  const { user } = useContext(UserContext);

  const getFavorites = () => {
    onValue(ref(database, `users/`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        Object.values(data).map((obj) => {
          if (obj.uid === user.uid) {
            if (obj.favorites) {
              setFavorites(obj.favorites);
            }
            return
          }
        });
      }
    });
  };

  useEffect(() => {
    if (user) {
      getFavorites();
    }
  }, [user]);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
        );
        setCoins(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getCoins();
  }, [selectedCurrency, page]);

  return (
    <div className="overflow-auto text-sm md:overflow-visible">
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loading />}
      <table className="relative w-full">
        <CoinTableHeader />
        <tbody>
          {coins &&
            coins.map((coin) => {
              return (
                <CoinTableRow
                  key={coin.id}
                  coin={coin}
                  currency={selectedCurrency}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setShowLoginModal={setShowLoginModal}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
