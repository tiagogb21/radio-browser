import React, { useState } from "react";
import { IRadio } from "../../../types/interfaces/IRadio";
import { FaCheck, FaPencilAlt, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { EditModal } from "../../EditModal";

interface CardProps {
  radio: IRadio;
  playingRadio: string;
  handlePlayStop: (url: string) => void;
  removeFromFavorites?: (changeuuid: string) => void;
  hasOption?: boolean;
  className?: string;
  addToFavorites?: (radio: IRadio) => void;
  onUpdate?: (radio: IRadio) => void;
  isSelected?: boolean;
}

export const RadioCard = ({
  radio,
  playingRadio,
  handlePlayStop,
  removeFromFavorites,
  hasOption = true,
  className,
  addToFavorites,
  onUpdate,
  isSelected = false,
}: CardProps) => {
  const { changeuuid, name, url_resolved } = radio;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleSaveEdit = () => {
    const updatedRadio = { ...radio, name: editedName };

    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const newFavorites = storedFavorites.map((fav: IRadio) =>
      fav.changeuuid === changeuuid ? updatedRadio : fav
    );

    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    if (onUpdate) {
      onUpdate(updatedRadio);
    }

    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex justify-between items-center bg-project-gray-card px-2 py-4 ${className} ${
        hasOption ? "lg:px-10" : "cursor-pointer hover:bg-project-gray-title"
      }`}
      key={changeuuid}
      onClick={() => addToFavorites && addToFavorites(radio)}
    >
      <div className="flex gap-2 items-center">
        {hasOption && (
          <div className="bg-project-gray-options p-2 rounded-full flex items-center justify-center">
            <button
              onClick={() => handlePlayStop(url_resolved)}
              className={`${playingRadio === url_resolved ? "" : "pl-1"}`}
              data-testid={`button-play-stop-${radio.changeuuid}`}
            >
              {playingRadio === url_resolved ? (
                <FaStop size={24} />
              ) : (
                <FaPlay size={24} />
              )}
            </button>
          </div>
        )}
        <div>
          <h3>{name}</h3>
          {hasOption && <p>{radio.country}</p>}
        </div>
      </div>

      {isSelected && <FaCheck className="text-project-blue-icon1" />}

      {hasOption && removeFromFavorites && (
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsModalOpen(true)}
            data-testid={`button-pencil-${radio.changeuuid}`}
          >
            <FaPencilAlt size={24} />
          </button>
          <button
            onClick={() => removeFromFavorites(changeuuid)}
            data-testid={`button-trash-${radio.changeuuid}`}
          >
            <FaTrash size={24} />
          </button>
          <EditModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            name={name}
            editedName={editedName}
            setEditedName={setEditedName}
            handleSaveEdit={handleSaveEdit}
          />
        </div>
      )}
    </div>
  );
};
