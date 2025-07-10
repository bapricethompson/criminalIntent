// FruitCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ListItem({ title, date, solved }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardFlex}>
        <Text style={styles.textBold}>{title}</Text>
        {solved && <MaterialIcons name="local-police" size={28} />}
      </View>
      <Text style={styles.text}>{new Date(date).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
  },
  cardFlex: {
    display: "flex", // optional, flex is default in RN
    flexDirection: "row", // arrange children horizontally
    justifyContent: "space-between", // space items evenly
    alignItems: "center", // vertically center items
  },
  textBold: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Roboto_700Bold",
  },
  text: {
    fontSize: 18,
  },
});
