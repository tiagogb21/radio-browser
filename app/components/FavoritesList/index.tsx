import React from "react";
import { IRadio } from "../../types/interfaces/IRadio";
import { RadioCard } from "../common/RadioCard";
import { Skeleton } from "../common/Skeleton";

interface FavoriteListProps {
  favorites: IRadio[];
  search: string;
  playingRadio: string;
  handlePlayStop: (url: string) => void;
  removeFromFavorites: (changeuuid: string) => void;
  handleUpdateFavorite: (updatedRadio: IRadio) => void;
  favoritePage: number;
  setFavoritePage: (page: number) => void;
}

const itemsPerPage: number = 10;

export const FavoriteList = ({
  favorites,
  search,
  playingRadio,
  handlePlayStop,
  removeFromFavorites,
  handleUpdateFavorite,
  favoritePage,
}: FavoriteListProps) => {
  const filteredFavorites = favorites.filter(
    (el) =>
      el.name.toLowerCase().includes(search.toLowerCase().trim()) ||
      el.country.toLowerCase().includes(search.toLowerCase().trim()) ||
      el.language.toLowerCase().includes(search.toLowerCase().trim())
  );

  if (filteredFavorites.length === 0) {
    return <Skeleton />;
  }

  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);

  const validPage = Math.min(favoritePage, totalPages);

  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const favoritesToDisplay = filteredFavorites.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-2 px-2">
      {favoritesToDisplay
        .map((radio) => (
          <RadioCard
            key={radio.changeuuid}
            radio={radio}
            playingRadio={playingRadio}
            handlePlayStop={handlePlayStop}
            removeFromFavorites={removeFromFavorites}
            onUpdate={handleUpdateFavorite}
          />
        ))}
    </div>
  );
};
