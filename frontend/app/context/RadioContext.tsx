import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import type { IRadio } from "../types/interfaces/IRadio";

interface RadioContextType {
  radios: IRadio[];
}

interface RadiosProviderProps {
  children: ReactNode;
}

export const RadiosContext = createContext({} as RadioContextType);

export function RadiosProvider({ children }: RadiosProviderProps) {
  const [radios, setRadios] = useState<IRadio[]>([]);

  const fetchRadios = useCallback(async (query?: string) => {
    try {
      const response = await fetch(
        `https://de1.api.radio-browser.info/json/stations/search?limit=10`
      );
      const data = await response.json();
      setRadios(data);
    } catch (error) {
      console.error("Failed to fetch radios:", error);
    }
  }, []);

  useEffect(() => {
    fetchRadios();
  }, [fetchRadios]);

  return (
    <RadiosContext.Provider
      value={{
        radios,
      }}
    >
      {children}
    </RadiosContext.Provider>
  );
}
