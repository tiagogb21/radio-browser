import React from "react";
import { IRadio } from "../../types/interfaces/IRadio";
import { RadioCard } from "../common/RadioCard";

interface RadioListProps {
  radios: IRadio[];
  radioSearch: string;
  playingRadio: string;
  handlePlayStop: (url: string) => void;
  addToFavorites: (radio: IRadio) => void;
}

export const RadioList = ({ radios, radioSearch, playingRadio, handlePlayStop, addToFavorites }: RadioListProps) => {
  return (
    <div className="flex flex-col gap-2 px-2">
      {radios.filter((el) =>
          el.name.toLowerCase().includes(radioSearch.toLowerCase().trim())
          || el.country.toLowerCase().includes(radioSearch.toLowerCase().trim())
          || el.language.toLowerCase().includes(radioSearch.toLowerCase().trim())
      ).map((radio) => (
        <RadioCard
          key={radio.changeuuid}
          radio={radio}
          playingRadio={playingRadio}
          handlePlayStop={handlePlayStop}
          hasOption={false}
          addToFavorites={() => addToFavorites(radio)}
        />
      ))}
    </div>
  );
};
