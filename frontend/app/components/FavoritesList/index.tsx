import { IRadio } from "@/app/types/interfaces/IRadio";
import { RadioCard } from "../common/RadioCard";

interface FavoriteListProps {
  favorites: IRadio[];
  search: string;
  playingRadio: string;
  handlePlayStop: (url: string) => void;
  removeFromFavorites: (changeuuid: string) => void;
  handleUpdateFavorite: (updatedRadio: IRadio) => void;
}

export const FavoriteList = ({
  favorites,
  search,
  playingRadio,
  handlePlayStop,
  removeFromFavorites,
  handleUpdateFavorite,
}: FavoriteListProps) => {
  return (
    <div className="flex flex-col gap-2 px-2">
      {favorites
        .filter(
          (el) =>
            el.name.toLowerCase().includes(search) ||
            el.country.toLowerCase().includes(search) ||
            el.language.toLowerCase().includes(search)
        )
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
