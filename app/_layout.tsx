import { FavoritesProvider } from "./FavoritesContext";
import { ThemeProvider } from "./ThemeContext";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Slot />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
