import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function IconButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <MaterialIcons
        name="add-a-photo"
        size={35}
        color="black"
        style={{ marginRight: 12, marginLeft: 12 }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
