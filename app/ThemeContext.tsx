import React, { createContext, useContext, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";

const lightTheme = {
  background: "#fff",
  text: "#000",
  primary: "#FFA500",
  secondary: "#FFF3E0",
};

const darkTheme = {
  background: "#121212",
  text: "#fff",
  primary: "#FF9800",
  secondary: "#1E1E1E",
};

const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme : lightTheme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
