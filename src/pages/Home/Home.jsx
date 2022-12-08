import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import BackToTopButton from "../../components/UI/BackToTopButton";
import Heading from "../../components/UI/Heading";
import Pagination from "../../components/UI/Pagination";
import SearchInput from "../../components/UI/SearchInput";
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
        <div className="flex items-center h-full">
          <div className="py-3 pl-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded-l-md">
            <CgSearch />
          </div>
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <CoinTable
        page={page}
        setShowLoginModal={setShowLoginModal}
        search={search}
      />
      <Pagination page={page} setPage={setPage} />
      <BackToTopButton />
    </div>
  );
};

export default Home;
