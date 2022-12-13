import React from "react";
import PortfolioRow from "./PortfolioRow";
import PortfolioTableHead from "./PortfolioTableHead";
import Heading from "../../../components/UI/Heading";
import { uuidv4 } from "@firebase/util";

const PortfolioTable = ({ portfolio, openModal }) => {
  return (
    <>
      <Heading content={"Your Coins"} />
      <table className="relative w-full">
        <PortfolioTableHead />
        <tbody>
          {portfolio.map((coin) => {
            return <PortfolioRow key={uuidv4()} coin={coin} openModal={openModal} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default PortfolioTable;
