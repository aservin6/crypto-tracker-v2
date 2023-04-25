import React from "react";
import Heading from "../../../components/UI/Heading";
import FavoritesItem from "./FavoritesItem";
import { AiFillStar } from "react-icons/ai";

const Favorites = ({ favorites }) => {
  return (
    <>
      <Heading
        content={"Favorites"}
        icon={<AiFillStar className="w-4 h-4 text-amber-500" />}
      />
      {favorites && (
        <ul className="grid grid-cols-2 gap-1 md:grid-cols-6">
          {favorites.map((fav, index) => {
            return <FavoritesItem fav={fav} key={index} />;
          })}
        </ul>
      )}
      {!favorites && (
        <h2 className="mt-10 text-2xl font-semibold text-center mb-10 border-b border-black border-opacity-10">Don't forget to add your favorite coins!</h2>
      )}
    </>
  );
};

export default Favorites;
