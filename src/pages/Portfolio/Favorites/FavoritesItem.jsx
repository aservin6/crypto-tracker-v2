import React from "react";
import { Link } from "react-router-dom";

const FavoritesItem = ({ fav }) => {
  return (
    <>
      {fav && (
        <Link to={`/coins/${fav.id}`}>
          <div className="flex items-center justify-center py-2 md:py-3 bg-white rounded-md drop-shadow dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700">
            <img src={fav.image} alt={`${fav.name}`} className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold dark:text-neutral-300">
              {fav.symbol.toUpperCase()}
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default FavoritesItem;
