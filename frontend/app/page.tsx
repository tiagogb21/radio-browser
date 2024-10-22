"use client";

import { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { IRadio } from "./types/interfaces/IRadio";
import { RadiosContext } from "./context/RadioContext";
import { useContextSelector } from "use-context-selector";
import { AudioPlayer } from "./components/AudioPlayer";
import { Drawer } from "./components/Drawer";
import { Pagination } from "./components/Pagination";
import { RadioList } from "./components/RadioList";
import { SearchBar } from "./components/SearchBar";
import { FavoriteList } from "./components/FavoritesList";
import { Top } from "./components/Top";
import { DancingCircles } from "./components/DancingCircles";

export default function Home() {
  const radios = useContextSelector(
    RadiosContext,
    (context) => context?.radios
  );

  const [favorites, setFavorites] = useState<IRadio[]>([]);
  const [playingRadio, setPlayingRadio] = useState<string>("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const addToFavorites = (radio: IRadio) => {
    const newFavorites = [...favorites, radio];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (changeuuid: string) => {
    const newFavorites = favorites.filter(
      (radio) => radio.changeuuid !== changeuuid
    );
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handlePlayStop = (url: string) => {
    if (playingRadio === url) {
      setPlayingRadio("");
    } else {
      setPlayingRadio(url);
    }
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <main className="min-h-screen bg-project-gray-cotainer p-10 flex">
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
        <SearchBar search={search} setSearch={setSearch} />
        <RadioList
          radios={radios}
          playingRadio={playingRadio}
          handlePlayStop={handlePlayStop}
          addToFavorites={addToFavorites}
        />
      </Drawer>

      <div
        className={`flex-1 transition-margin ${
          isDrawerOpen ? "ml-80" : "ml-0"
        }`}
      >
        <button
          className="text-white"
          type="button"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <IoMenu size={24} />
        </button>

        <div className="container mx-auto flex flex-col gap-2 min-h-96">
          <Top search={search} setSearch={setSearch} />
          <div className="bg-project-gray-options min-h-72 rounded-lg">
            {favorites.length > 0 ? (
              <DancingCircles
                radio={
                  favorites.find(
                    (radio) => radio.url_resolved === playingRadio
                  ) || favorites[0]
                }
                playingRadio={playingRadio}
                handlePlayStop={handlePlayStop}
              />
            ) : (
              <h2 className="text-xl uppercase p-4">Available Radios</h2>
            )}
            <FavoriteList
              favorites={favorites}
              playingRadio={playingRadio}
              handlePlayStop={handlePlayStop}
              removeFromFavorites={removeFromFavorites}
            />
            <Pagination page={page} setPage={setPage} />
          </div>
        </div>
      </div>

      <AudioPlayer playingRadio={playingRadio} />
    </main>
  );
}
