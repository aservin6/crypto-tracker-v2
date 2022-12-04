import React, { useState } from "react";
import BackToTopButton from "../../components/UI/BackToTopButton";
import Pagination from "../../components/UI/Pagination";
import CoinTable from "./CoinTable/CoinTable";

const Home = ({ setShowLoginModal }) => {
  const [page, setPage] = useState(1);

  return (
    <div className="mt-2 md:mt-5">
      <CoinTable page={page} setShowLoginModal={setShowLoginModal} />
      <Pagination page={page} setPage={setPage} />
      <BackToTopButton />
    </div>
  );
};

export default Home;
