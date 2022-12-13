import React, { useState } from "react";
import BackToTopButton from "../../components/UI/BackToTopButton";
import Heading from "../../components/UI/Heading";
import SearchBar from "../../components/UI/SearchBar";
import CoinTable from "./CoinTable/CoinTable";
import TrendingCoins from "./TrendingCoins/TrendingCoins";

const Home = ({ setShowLoginModal }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className="mt-2 md:mt-5">
      <TrendingCoins />
      <div className="flex flex-col justify-between w-full gap-1 mt-5 mb-2 md:items-center md:flex-row whitespace-nowrap">
        <Heading content={"Cryptocurrencies by Market Cap"} />
        <SearchBar onChange={(e) => setSearch(e.target.value.toLowerCase())} />
      </div>
      <CoinTable
        page={page}
        setPage={setPage}
        setShowLoginModal={setShowLoginModal}
        search={search}
      />
      <BackToTopButton />
    </div>
  );
};

export default Home;
