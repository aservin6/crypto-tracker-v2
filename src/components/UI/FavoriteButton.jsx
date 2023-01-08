import React, { useContext } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { database } from "../../utils/firebase";
import { ref, update } from "firebase/database";
import UserContext from "../../store/auth-context";

const FavoriteButton = ({
  coin,
  favorites,
  setFavorites,
  setShowLoginModal,
}) => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user ? true : false;

  const showLoginModal = () => {
    setShowLoginModal(true);
  };

  const addFavoriteToDb = () => {
    const uid = user.uid;
    update(ref(database, `users/${uid}`), {
      favorites: [
        ...favorites,
        {
          id: coin.id,
          name: coin.name,
          image: coin.image,
          symbol: coin.symbol,
        },
      ],
    });
  };

  const removeFavoriteFromDb = () => {
    const uid = user.uid;
    update(ref(database, `users/${uid}`), {
      favorites: favorites.filter((favorite) => favorite.id !== coin.id),
    });
  };

  const handleAddToFavorites = () => {
    if (isLoggedIn) {
      setFavorites([
        ...favorites,
        {
          id: coin.id,
          name: coin.name,
          image: coin.image,
          symbol: coin.symbol,
        },
      ]),
        addFavoriteToDb();
    } else {
      window.scrollTo(0, 0);
      showLoginModal();
    }
  };

  const handleRemoveFromFavorites = () => {
    setFavorites(favorites.filter((obj) => obj.id !== coin.id));
    removeFavoriteFromDb();
  };

  const isFavorited = favorites.find((obj) => obj.id === coin.id);

  return (
    <>
      {isFavorited ? (
        <button
          onClick={handleRemoveFromFavorites}
          className="flex items-center pl-1 mr-2 text-amber-400"
          aria-label="favorited coin"
        >
          <AiFillStar className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={handleAddToFavorites}
          className="flex items-center pl-1 mr-2"
          aria-label="non favorited coin"
        >
          <AiOutlineStar className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
