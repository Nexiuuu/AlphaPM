import { createContext } from "react";
import type { Theme } from "../../features/settings/types";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
