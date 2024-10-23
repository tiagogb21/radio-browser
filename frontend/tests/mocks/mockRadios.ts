import type { IRadio } from "../../app/types/interfaces/IRadio";

export const mockRadios: IRadio[] = [
  {
    changeuuid: "1",
    name: "Radio One",
    country: "Brazil",
    url_resolved: "http://radioone.com/stream",
    image: "http://radioone.com/stream",
    url: "http://radioone.com/stream",
    playcount: 0,
    is_favorite: false,
    language: "en-US",
  },
  {
    changeuuid: "2",
    name: "Radio Two",
    country: "USA",
    url_resolved: "http://radiotwo.com/stream",
    image: "http://radiotwo.com/stream",
    url: "http://radiotwo.com/stream",
    playcount: 0,
    is_favorite: false,
    language: "en-US",
  },
];
