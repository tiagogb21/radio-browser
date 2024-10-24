import React from "react";
import type { IRadio } from "../../types/interfaces/IRadio";
import { FaStop } from "react-icons/fa";

interface DancingCirclesProps {
  radio: IRadio;
  playingRadio?: string;
  handlePlayStop: (url: string) => void;
}

export const DancingCircles = ({
  radio,
  playingRadio,
  handlePlayStop,
}: DancingCirclesProps) => {
  return (
    <div className="flex flex-col gap-2 px-4 lg:px-14 py-4 border-b border-solid border-gray-700 shadow-md shadow-gray-500/50 mb-4">
      <div key={radio.changeuuid} className="flex items-center">
        <div className="relative flex justify-center items-center w-10 h-10">
          {playingRadio === radio.url_resolved && (
            <>
              <div className="absolute w-10 h-10 rounded-full border-2 border-green-500 animate-ping"></div>
              <div className="absolute w-8 h-8 rounded-full border-2 border-green-500 animate-ping delay-200"></div>
              <div className="absolute w-6 h-6 rounded-full border-2 border-green-500 animate-ping delay-400"></div>
            </>
          )}
            <FaStop size={24} />
        </div>
        <p className="uppercase font-bold">{radio.name}</p>
      </div>
    </div>
  );
};
