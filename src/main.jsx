import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./store/auth-context";
import { CurrencyContextProvider } from "./store/currency-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CurrencyContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CurrencyContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
