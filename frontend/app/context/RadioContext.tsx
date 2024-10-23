import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import type { IRadio } from "../types/interfaces/IRadio";

interface RadioContextType {
  radios: IRadio[];
  fetchRadios: (radioSearch?: string, searchFilter?: string, page?: number) => void;
}

interface RadiosProviderProps {
  children: ReactNode;
}

export const RadiosContext = createContext<RadioContextType>({
  radios: [],
  fetchRadios: () => {},
});

export function RadiosProvider({ children }: RadiosProviderProps) {
  const [radios, setRadios] = useState<IRadio[]>([]);

  const fetchRadios = useCallback(
    async (searchFilter = "", radioSearch = "", page = 1) => {
      try {
        const offset = (page - 1) * 10;
        let url = `https://de1.api.radio-browser.info/json/stations/search?limit=10&offset=${offset}`

        if(searchFilter.length > 0 && radioSearch.length > 0) url += `&${searchFilter}=${radioSearch}`

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error fetching radios: ${response.statusText}`);
        }

        const data = await response.json();
        setRadios(data);
      } catch (error) {
        console.error("Failed to fetch radios:", error);
      }
    },
    []
  );

  useEffect(() => {
    fetchRadios();
  }, [fetchRadios]);

  return (
    <RadiosContext.Provider value={{ radios, fetchRadios }}>
      {children}
    </RadiosContext.Provider>
  );
}
