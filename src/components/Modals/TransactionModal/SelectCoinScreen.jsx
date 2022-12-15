import React from "react";
import Heading from "../../UI/Heading";
import SearchBar from "../../UI/SearchBar";
import CoinListItem from "./CoinListItem";

const SelectCoinScreen = ({ handleSearch, setSearch }) => {
  return (
    <>
      <div className="space-y-2">
        <Heading content={"Select Coin"} />
        <SearchBar
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
      </div>
      <ul className="h-full overflow-y-auto hide-scrollbar md:max-h-[24rem] mt-2">
        {handleSearch().map((coin) => {
          return (
            <CoinListItem
              key={coin.id}
              coin={coin}
            />
          );
        })}
      </ul>
    </>
  );
};

export default SelectCoinScreen;
