import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import type { IRadio } from "../types/interfaces/IRadio";

interface RadioContextType {
  radios: IRadio[];
  fetchRadios: (query?: string, country?: string, language?: string, page?: number) => void;
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
    async () => {
      try {
        const response = await fetch(`https://de1.api.radio-browser.info/json/stations/search?limit=10`);

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
