import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../store/auth-context";
import TransactionContext from "../../../store/transaction-context";
import { database } from "../../../utils/firebase";
import { ref, update } from "firebase/database";

const TransactionRow = ({ transaction }) => {
  const { setTransactions, transactions } = useContext(TransactionContext);
  const { user } = useContext(UserContext);
  const handleRemove = () => {
    setTransactions(transactions.filter((obj) => obj.id !== transaction.id));
    const uid = user.uid;
    update(ref(database, `users/${uid}`), {
      transactions: transactions.filter((obj) => obj.id !== transaction.id),
    });
  }

  return (
    <tr className="border-b border-opacity-10 dark:border-white dark:border-opacity-20 h-[3.75rem]">
      <td className="pl-5 text-left min-w-[11rem]">
        <div className="flex items-center text-left whitespace-nowrap">
          <div className="mr-2 overflow-hidden">
            <img
              className="w-5"
              src={transaction.coin_image}
              alt={transaction.coin_name}
            />
          </div>
          <div>
            <Link
              className="flex flex-col md:items-center md:flex-row hover:underline"
              to={`/coins/${transaction.coin_id}`}
            >
              <span className="font-bold">{transaction.coin_name}</span>
              <span className="ml-0 text-xs text-neutral-600 dark:text-neutral-400 md:ml-2">
                {transaction.coin_symbol.toUpperCase()}
              </span>
            </Link>
          </div>
        </div>
      </td>
      <td className="text-left min-w-[5rem]">{transaction.type}</td>
      <td className="text-right min-w-[5rem]">{transaction.quantity}</td>
      <td className="text-right min-w-[10rem]">
        ${transaction.price_per_coin.toLocaleString()}
      </td>
      <td className="text-right min-w-[10rem]">
        ${transaction.total.toLocaleString()}
      </td>
      <td className="pr-5 text-right min-w-[10rem]">
        <button onClick={handleRemove} className="bg-neutral-100 dark:bg-neutral-800 py-1 px-2 rounded-md text-red-600 font-semibold hover:bg-neutral-200 hover:dark:bg-neutral-700">
          REMOVE
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
