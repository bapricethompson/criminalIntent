import React, { createContext, useContext, useEffect, useState } from "react";
import { loadTheme, saveTheme } from "../hooks/useStorage";

const THEMES = {
  white: { backgroundColor: "white", textColor: "black", isLight: true },
  black: { backgroundColor: "black", textColor: "white", isLight: false },
  purple: { backgroundColor: "purple", textColor: "white", isLight: false },
  red: { backgroundColor: "red", textColor: "white", isLight: false },
  lightgreen: {
    backgroundColor: "lightgreen",
    textColor: "black",
    isLight: true,
  },
  lightblue: {
    backgroundColor: "lightblue",
    textColor: "black",
    isLight: true,
  },
};

function shadeColor(color, percent) {
  const shades = {
    purple: { lighter: "#ac65ac", darker: "#4b0082" },
    red: { lighter: "#c71e1e", darker: "#8b0000" },
    black: { lighter: "#575050", darker: "#000000" },
    white: { lighter: "#ffffff", darker: "#f5ecec" },
    lightgreen: { lighter: "#99ff99", darker: "#8fe38f" },
    lightblue: { lighter: "#99ccff", darker: "#a4cad6" },
  };

  if (!shades[color]) return "#ccc"; // fallback

  return percent > 0 ? shades[color].lighter : shades[color].darker;
}

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("purple");

  useEffect(() => {
    loadTheme().then((savedTheme) => {
      if (savedTheme && THEMES[savedTheme]) {
        setThemeColor(savedTheme);
      }
    });
  }, []);

  useEffect(() => {
    saveTheme(themeColor);
  }, [themeColor]);

  const theme = THEMES[themeColor] || THEMES["purple"];
  let secondaryColor;
  if (theme.isLight) {
    secondaryColor = shadeColor(themeColor, -20);
  } else {
    secondaryColor = shadeColor(themeColor, 20);
  }

  const themeStyles = {
    backgroundColor: theme.backgroundColor,
    textColor: theme.textColor,
    secondaryColor,
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
