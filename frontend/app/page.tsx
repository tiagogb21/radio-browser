"use client";

import React, { useState, useEffect } from "react";
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

  const fetchRadios = useContextSelector(
    RadiosContext,
    (context) => context.fetchRadios
  );

  const [favorites, setFavorites] = useState<IRadio[]>([]);
  const [playingRadio, setPlayingRadio] = useState<string>("");
  const [search, setSearch] = useState("");
  const [radioSearch, setRadioSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState("name");

  const addToFavorites = (radio: IRadio) => {
    const alreadyFavorite = favorites.find(
      (favorite) => favorite.changeuuid === radio.changeuuid
    );
    if (!alreadyFavorite) {
      const newFavorites = [...favorites, radio];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
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

  const handleUpdateFavorite = (updatedRadio: IRadio) => {
    const newFavorites = favorites.map((radio) =>
      radio.changeuuid === updatedRadio.changeuuid ? updatedRadio : radio
    );
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchRadios(searchFilter, radioSearch, page);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [radioSearch, searchFilter, page, fetchRadios]);

  return (
    <main className="w-full min-h-screen bg-project-gray-cotainer p-10 flex">
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
        <SearchBar
          radioSearch={radioSearch}
          setRadioSearch={setRadioSearch}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <RadioList
          radios={radios}
          playingRadio={playingRadio}
          handlePlayStop={handlePlayStop}
          addToFavorites={addToFavorites}
        />
      </Drawer>

      <div
        className={`flex-1 transition-margin ${
          isDrawerOpen ? "md:ml-80" : "md:ml-0"
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
          <div className="bg-project-gray-options flex flex-col justify-between min-h-72 rounded-lg pb-4">
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
              search={search}
              favorites={favorites}
              playingRadio={playingRadio}
              handlePlayStop={handlePlayStop}
              removeFromFavorites={removeFromFavorites}
              handleUpdateFavorite={handleUpdateFavorite}
            />
            <Pagination page={page} setPage={setPage} />
          </div>
        </div>
      </div>

      <AudioPlayer playingRadio={playingRadio} />
    </main>
  );
}
