import { IRadio } from "@/app/types/interfaces/IRadio";
import { RadioCard } from "../common/RadioCard";

interface RadioListProps {
  radios: IRadio[];
  playingRadio: string;
  handlePlayStop: (url: string) => void;
  addToFavorites: (radio: IRadio) => void;
}

export const RadioList = ({ radios, playingRadio, handlePlayStop, addToFavorites }: RadioListProps) => {
  return (
    <div className="flex flex-col gap-2 px-2">
      {radios.map((radio) => (
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
