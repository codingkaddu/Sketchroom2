import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundAtom, Background } from "./background.atom";

export const useBackground = () => useRecoilValue(backgroundAtom);
export const useSetBackground = () => useSetRecoilState(backgroundAtom);

// Helper function to set background in one call
export const setBackground = (set: ReturnType<typeof useSetBackground>, bg: Background) => {
  set(bg);
};
