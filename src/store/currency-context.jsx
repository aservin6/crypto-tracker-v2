import React, { useState, createContext } from "react";

const CurrencyContext = createContext({
  selectedCurrency: "",
  onChangeCurrency: () => {},
});

export const CurrencyContextProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency: selectedCurrency,
        onChangeCurrency: handleCurrencyChange,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
