import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function StyledButton({ onPress, title = "Save" }) {
  console.log("im pressed");
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "purple",
    paddingVertical: 12,
    marginVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
