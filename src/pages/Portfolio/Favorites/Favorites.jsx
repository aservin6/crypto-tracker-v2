import React from "react";
import Heading from "../../../components/UI/Heading";
import FavoritesItem from "./FavoritesItem";
import { AiFillStar } from "react-icons/ai";

const Favorites = ({ favorites }) => {
  return (
    <div className="border-b border-black border-opacity-10 dark:border-white dark:border-opacity-20">
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
      {!favorites ||
        (!favorites.length > 0 && (
          <h3 className="mt-10 text-xl text-center mb-16 text-black dark:text-opacity-60 px-2 dark:text-white">
            Don't forget to add your favorite coins!
          </h3>
        ))}
    </div>
  );
};

export default Favorites;
