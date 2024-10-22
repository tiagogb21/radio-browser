import { IRadio } from "@/app/types/interfaces/IRadio";

export const fetchRadios = async (search: string, page: number): Promise<IRadio[]> => {
  const response = await fetch(
    `https://de1.api.radio-browser.info/json/stations/search?limit=10&offset=${(page - 1) * 10}&name=${search}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch radios");
  }
  return await response.json();
};