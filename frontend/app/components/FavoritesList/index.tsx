import { IRadio } from "@/app/types/interfaces/IRadio";
import { RadioCard } from "../common/RadioCard";

interface FavoriteListProps {
  favorites: IRadio[];
  playingRadio: string;
  handlePlayStop: (url: string) => void;
  removeFromFavorites: (changeuuid: string) => void;
}

export const FavoriteList = ({ favorites, playingRadio, handlePlayStop, removeFromFavorites }: FavoriteListProps) => {
  return (
    <div className="flex flex-col gap-2 px-2">
      {favorites.map((radio) => (
        <RadioCard
          key={radio.changeuuid}
          radio={radio}
          playingRadio={playingRadio}
          handlePlayStop={handlePlayStop}
          removeFromFavorites={removeFromFavorites}
        />
      ))}
    </div>
  );
};
