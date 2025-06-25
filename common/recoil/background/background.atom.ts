import { atom } from "recoil";

export type Background =
  | { mode: "dark" | "light"; withLines: boolean }
  | { mode: "image"; src: string };

export const backgroundAtom = atom<Background>({
  key: "backgroundAtom",
  default: { mode: "light", withLines: true },
});
