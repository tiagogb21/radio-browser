import { IRadio } from "@/app/types/interfaces/IRadio";
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
          el.name.toLowerCase().includes(radioSearch)
          || el.country.toLowerCase().includes(radioSearch)
          || el.language.toLowerCase().includes(radioSearch)
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
