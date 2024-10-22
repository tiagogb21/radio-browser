import type { IRadio } from "@/app/types/interfaces/IRadio";
import { FaPencilAlt, FaPlay, FaStop, FaTrash } from "react-icons/fa";

interface CardProps {
  radio: IRadio;
  playingRadio: string;
  handlePlayStop: (url: string) => void;
  removeFromFavorites?: (changeuuid: string) => void;
  hasOption?: boolean;
  className?: string;
  addToFavorites?: (radio: IRadio) => void;
}

export const RadioCard = ({
  radio,
  playingRadio,
  handlePlayStop,
  removeFromFavorites,
  hasOption = true,
  className,
  addToFavorites,
}: CardProps) => {
  const { changeuuid, name, url_resolved } = radio;

  return (
    <div
      className={`flex justify-between items-center bg-project-gray-card px-2 py-4 ${className} ${hasOption ? 'lg:px-10' : ''}`}
      key={changeuuid}
      onClick={() => addToFavorites?.(radio)}
    >
      <div className="flex gap-2 items-center">
        {hasOption && (
          <div className="bg-project-gray-options p-2 rounded-full flex items-center justify-center">
            <button onClick={() => handlePlayStop(url_resolved)}>
              {playingRadio === url_resolved ? (
                <FaStop size={24} />
              ) : (
                <FaPlay size={24} />
              )}
            </button>
          </div>
        )}
        <div>
          <h3 className={`${hasOption ? 'font-bold text-xl' : 'text-white'}`}>{name}</h3>
          {hasOption && (<p>{radio.country}</p>)}
        </div>
      </div>
      {(hasOption && removeFromFavorites) && (
        <div className="flex items-center gap-4">
          <button onClick={() => removeFromFavorites(changeuuid)}>
            <FaPencilAlt size={24} />
          </button>
          <button onClick={() => removeFromFavorites(changeuuid)}>
            <FaTrash size={24} />
          </button>
        </div>
      )}
    </div>
  );
};
