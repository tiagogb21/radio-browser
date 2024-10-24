import React from "react";
import { IRadio } from "../../types/interfaces/IRadio";
import { RadioCard } from "../common/RadioCard";

interface RadioListProps {
  radios: IRadio[];
  radioSearch: string;
  playingRadio: string;
  handlePlayStop: (url: string) => void;
  addToFavorites: (radio: IRadio) => void;
  selectedRadios: string[];
}

export const RadioList = ({
  radios,
  radioSearch,
  playingRadio,
  handlePlayStop,
  addToFavorites,
  selectedRadios,
}: RadioListProps) => {
  const filteredRadios =
    radioSearch?.length === 0
      ? radios
      : radios.filter(
          (radio) =>
            radio.name.toLowerCase().includes(radioSearch?.toLowerCase()) ||
            radio.country.toLowerCase().includes(radioSearch?.toLowerCase()) ||
            radio.language.toLowerCase().includes(radioSearch?.toLowerCase())
        );

  return (
    <div className="flex flex-col gap-2 px-2">
      {filteredRadios.map((radio) => (
        <RadioCard
          key={radio.changeuuid}
          radio={radio}
          playingRadio={playingRadio}
          handlePlayStop={handlePlayStop}
          hasOption={false}
          addToFavorites={() => addToFavorites(radio)}
          isSelected={selectedRadios.includes(radio.changeuuid)}
        />
      ))}
    </div>
  );
};
