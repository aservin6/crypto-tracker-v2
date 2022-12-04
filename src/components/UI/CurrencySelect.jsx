import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import CurrencyContext from "../../store/currency-context";

const CurrencySelect = () => {
  const { onChangeCurrency } = useContext(CurrencyContext);

  const [currencies, setCurrencies] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
        );
        setCurrencies(data);
      } catch (err) {
        let message = "Unknown Error";
        if (err instanceof Error) message = err.message;
        setError(message);
        setIsLoading(false);
      }
    };
    getCurrencies();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {currencies && (
        <select
          onChange={(e) => {
            onChangeCurrency(e.target.value);
          }}
          className="text-neutral-900 dark:text-white white dark:bg-neutral-900 text-[13px] outline-none hover:cursor-pointer"
        >
          <option value="usd" key="usd">
            USD
          </option>
          {currencies.map((item) => {
            if (item === "usd") {
              return;
            } else {
              return (
                <option value={item} key={item}>
                  {item.toUpperCase()}
                </option>
              );
            }
          })}
        </select>
      )}
    </>
  );
};

export default CurrencySelect;
