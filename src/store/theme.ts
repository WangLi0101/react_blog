import { themeList } from "@/utils/theme";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
interface ColorTheme {
  colorPrimary: string;
}
type State = {
  mode: "dark" | "light" | "auto";
  colorTheme: ColorTheme;
};

type Actions = {
  setMode: (mode: "dark" | "light" | "auto") => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
};

export const useThemeStore = create<State & Actions>()(
  persist(
    devtools((set) => ({
      mode: "light",
      colorTheme: themeList[0],

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
