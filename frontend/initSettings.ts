import { getUserTheme } from "./src/features/settings/LocalStorageSettings";

const theme = getUserTheme();

document.documentElement.classList.toggle("light", theme === "LIGHT");
