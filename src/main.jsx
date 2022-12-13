import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./store/auth-context";
import { CurrencyContextProvider } from "./store/currency-context";
import { TransactionContextProvider } from "./store/transaction-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TransactionContextProvider>
        <CurrencyContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CurrencyContextProvider>
      </TransactionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
