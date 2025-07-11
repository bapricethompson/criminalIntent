import { StyleSheet, Text, View } from "react-native";
import StyledButton from "../components/GeneralButton";
import { useTheme } from "../contexts/ThemeContext";

const THEMES = ["white", "black", "purple", "red", "lightgreen", "lightblue"];

export default function Settings() {
  const { setThemeColor, themeStyles } = useTheme();

  const themeChange = (color) => {
    console.log("THEME", color);
    setThemeColor(color);
  };

  const getTextColor = (bgColor) => {
    return bgColor === "white" ||
      bgColor === "lightgreen" ||
      bgColor === "lightblue"
      ? "black"
      : "white";
  };

  const formatColorName = (color) => {
    return color
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase words (if any)
      .replace(/light/, "Light ")
      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()); // Capitalize each word
  };

  return (
    <View
      style={[styles.bigDiv, { backgroundColor: themeStyles.backgroundColor }]}
    >
      <Text style={[styles.headerText, { color: themeStyles.textColor }]}>
        Pick A Theme
      </Text>
      <View>
        {THEMES.map((color) => (
          <StyledButton
            key={color}
            title={formatColorName(color)}
            color={color}
            textColor={getTextColor(color)}
            onPress={() => themeChange(color)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  bigDiv: {
    flex: 1,
    padding: 20,
  },
});
