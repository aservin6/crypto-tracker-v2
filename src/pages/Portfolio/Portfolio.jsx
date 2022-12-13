import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/auth-context";
import TransactionContext from "../../store/transaction-context";
import { database } from "../../utils/firebase";
import PortfolioTable from "./PortfolioTable/PortfolioTable";
import TransactionTable from "./TransactionTable/TransactionTable";
import Favorites from "./Favorites/Favorites";
import PortfolioValue from "./PortfolioValue";

const Portfolio = ({ setShowTransactionModal }) => {
  const { user } = useContext(UserContext);
  const openModal = () => setShowTransactionModal(true);
  const { transactions, setTransactions, portfolio } =
    useContext(TransactionContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = () => {
      onValue(ref(database, `users/`), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.values(data).map((obj) => {
            if (obj.uid === user.uid) {
              if (obj.favorites) {
                setFavorites(obj.favorites);
              }
              return;
            }
          });
        }
      });
    };
    const getTransactions = () => {
      onValue(ref(database, `users/`), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.values(data).map((obj) => {
            if (obj.uid === user.uid) {
              if (obj.transactions) {
                setTransactions(obj.transactions);
              }
              return;
            }
          });
        }
      });
    };

    if (user) {
      getFavorites();
      getTransactions();
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className="py-2 md:py-5">
          <section
            id="favorites-section"
            className="overflow-y-auto max-h-28 md:max-h-48 py-1"
          >
            {favorites.length > 0 && <Favorites favorites={favorites} />}
          </section>
          <PortfolioValue openModal={openModal} />
          {!portfolio.length > 0 && (
            <div className="text-center md:text-xl opacity-60">
              Your portfolio is empty, add coins to view them here.
            </div>
          )}
          <section
            id="portfolio-section"
            className="overflow-auto text-sm md:mb-5 md:overflow-visible"
          >
            {portfolio.length > 0 && (
              <PortfolioTable portfolio={portfolio} openModal={openModal} />
            )}
          </section>
          <section
            id="transactions-section"
            className="overflow-auto text-sm md:overflow-visible"
          >
            {transactions.length > 0 && (
              <TransactionTable transactions={transactions} />
            )}
          </section>
        </div>
      )}
      {!user && (
        <div className="mt-10 text-2xl font-semibold text-center">
          You must sign in to start tracking your coins!
        </div>
      )}
    </>
  );
};

export default Portfolio;
