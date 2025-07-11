import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ListItem({
  title,
  date,
  solved,
  textColor,
  backgroundColor,
}) {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.cardFlex}>
        <Text style={[styles.textBold, { color: textColor }]}>{title}</Text>
        {solved && (
          <MaterialIcons name="local-police" size={28} color={textColor} />
        )}
      </View>
      <Text style={[styles.text, { color: textColor }]}>
        {new Date(date).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
