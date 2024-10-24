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
  const [page, setPage] = useState<number>(1);
  const [favoritePage, setFavoritePage] = useState<number>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState("name");

  const [selectedRadios, setSelectedRadios] = useState<string[]>([]);

  const updateSelectedRadios = (newSelectedRadios: string[]) => {
    setSelectedRadios(newSelectedRadios);
    localStorage.setItem("selectedRadios", JSON.stringify(newSelectedRadios));
  };

  const addToFavorites = (radio: IRadio) => {
    const alreadyFavorite = favorites.find(
      (favorite) => favorite.changeuuid === radio.changeuuid
    );
    if (!alreadyFavorite) {
      const newFavorites = [...favorites, radio];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      if (!selectedRadios.includes(radio.changeuuid)) {
        updateSelectedRadios([...selectedRadios, radio.changeuuid]);
      }
    }
  };

  const removeFromFavorites = (changeuuid: string) => {
    const newFavorites = favorites.filter(
      (radio) => radio.changeuuid !== changeuuid
    );
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    const newSelectedRadios = selectedRadios.filter(id => id !== changeuuid);
    updateSelectedRadios(newSelectedRadios);
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
    const storedSelectedRadios = localStorage.getItem("selectedRadios");
    if (storedSelectedRadios) {
      setSelectedRadios(JSON.parse(storedSelectedRadios));
    }
  }, []);

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

  useEffect(() => {
    localStorage.setItem("selectedRadios", JSON.stringify(selectedRadios));
  }, [selectedRadios]);

  return (
    <main className="w-full min-h-screen bg-project-gray-cotainer p-10 flex">
      <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        page={page}
        setPage={setPage}
        radios={radios}
      >
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
          radioSearch={radioSearch}
          selectedRadios={selectedRadios}
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
          aria-label="Open Drawer"
          aria-labelledby="openDrawer"
        >
          <IoMenu size={24} />
        </button>

        <div className="container mx-auto flex flex-col gap-2 min-h-96">
          <Top search={search} setSearch={setSearch} />
          <div className="bg-project-gray-options flex flex-col min-h-72 rounded-lg pb-4">
            {favorites.length > 0 ? (
              <DancingCircles
                radio={
                  favorites.find(
                    (radio) => radio.url_resolved === playingRadio
                  ) || favorites[0]
                }
                playingRadio={playingRadio}
              />
            ) : (
              <div className="p-4">
                <h2 className="text-xl uppercase">Available Radios</h2>
              </div>
            )}
            <div className="flex-1 flex flex-col justify-between">
              <FavoriteList
                search={search}
                favorites={favorites}
                playingRadio={playingRadio}
                handlePlayStop={handlePlayStop}
                removeFromFavorites={removeFromFavorites}
                handleUpdateFavorite={handleUpdateFavorite}
                favoritePage={favoritePage}
                setFavoritePage={setFavoritePage}
              />
              <Pagination radios={favorites} page={favoritePage} setPage={setFavoritePage} isFavorites />
            </div>
          </div>
        </div>
      </div>

      <AudioPlayer playingRadio={playingRadio} />
    </main>
  );
}
