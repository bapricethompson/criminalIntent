import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function StyledButton({
  onPress,
  title = "Save",
  color = "purple",
  textColor = "white",
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    marginVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // for Android
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
