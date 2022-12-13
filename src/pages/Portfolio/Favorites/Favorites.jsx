import React from "react";
import Heading from "../../../components/UI/Heading";
import FavoritesItem from "./FavoritesItem";
import { AiFillStar } from "react-icons/ai";

const Favorites = ({ favorites }) => {
  return (
    <>
      <Heading content={"Favorites"} icon={<AiFillStar className="w-4 h-4 text-amber-500"/>} />
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-6">
        {favorites.map((fav, index) => {
          return <FavoritesItem fav={fav} key={index} />;
        })}
      </ul>
    </>
  );
};

export default Favorites;
