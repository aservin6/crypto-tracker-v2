import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Portfolio from "./pages/Portfolio/Portfolio";
import Coin from "./pages/Coin/Coin";
import ThemeSwitch from "./components/UI/ThemeSwitch";
import MarketOverview from "./components/UI/MarketOverview";
import CurrencySelect from "./components/UI/CurrencySelect";
import ModalPortal from "./components/Modals/ModalPortal";
import { useEffect } from "react";

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    if (showLoginModal || showSignupModal) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [showLoginModal, showSignupModal]);

  return (
    <div className="min-h-screen max-h-full px-3 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-primary">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between lg:flex-row lg:h-12">
          <MarketOverview />
          <div className="flex items-center self-end order-first gap-4 py-2 md:self-start md:order-last md:ml-auto md:py-0 lg:h-12">
            <CurrencySelect />
            <ThemeSwitch />
          </div>
        </div>
        <Navbar
          onShowSignup={setShowSignupModal}
          onShowLogin={setShowLoginModal}
        />
        <ModalPortal
          showLoginModal={showLoginModal}
          showSignupModal={showSignupModal}
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />
        <Routes>
          <Route path="/coins/:id" element={<Coin />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/"
            element={<Home setShowLoginModal={setShowLoginModal} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
