import { themeList, Theme } from "@/utils/theme";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type State = {
  mode: "dark" | "light" | "auto";
  colorTheme: Theme;
  isDark: boolean;
};

type Actions = {
  setMode: (mode: "dark" | "light" | "auto") => void;
  setColorTheme: (colorTheme: Theme) => void;
  setIsDark: (isDark: boolean) => void;
};

export const useThemeStore = create<State & Actions>()(
  persist(
    devtools((set) => ({
      mode: "auto",
      colorTheme: themeList["#1677ff"],
      isDark: false,
      // Actions
      setMode: (mode) => {
        set({ mode });
      },
      setColorTheme: (colorTheme) => {
        set({ colorTheme });
      },
      setIsDark: (isDark) => {
        set({ isDark });
      },
    })),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
