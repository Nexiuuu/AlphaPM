import { useEffect, useState } from "react";
import { type Theme } from "../../features/settings/types";
import {
  getUserTheme,
  updateUserSetting,
} from "../../features/settings/LocalStorageSettings";
import { ThemeContext } from "./ThemeContext";

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const userTheme = getUserTheme();
  const [theme, setThemeState] = useState(userTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "LIGHT");
    updateUserSetting("theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
