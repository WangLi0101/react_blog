import { themeList, Theme } from "@/utils/theme";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type State = {
  mode: "dark" | "light" | "auto";
  colorTheme: Theme;
};

type Actions = {
  setMode: (mode: "dark" | "light" | "auto") => void;
  setColorTheme: (colorTheme: Theme) => void;
};

export const useThemeStore = create<State & Actions>()(
  persist(
    devtools((set) => ({
      mode: "light",
      colorTheme: themeList["#1677ff"],

      // Actions
      setMode: (mode) => {
        set({ mode });
      },
      setColorTheme: (colorTheme) => {
        set({ colorTheme });
      },
    })),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
