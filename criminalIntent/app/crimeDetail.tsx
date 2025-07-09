import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import ImagePickerView from "../components/ImagePicker";
import StyledButton from "../components/GeneralButton";

export default function crimeDetails() {
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const saveCrime = async () => {
    console.log("SAVE");
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios"); // iOS keeps picker open
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View>
      <ImagePickerView />
      <View style={styles.detailsDiv}>
        <Text style={styles.detailsTitle}>Details</Text>
        <TextInput
          style={styles.textArea}
          placeholder="What happened?"
          multiline={true}
          numberOfLines={4}
          value={value}
          onChangeText={setValue}
        />
      </View>
      <StyledButton
        title={`Pick a date: ${date.toLocaleDateString()}`}
        onPress={() => setShowPicker(true)}
      />
      <StyledButton title={"Save"} onPress={saveCrime} />
    </View>
  );
}
const styles = StyleSheet.create({
  detailsDiv: {
    paddingLeft: 26,
    paddingTop: 16,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textArea: {
    borderColor: "#999",
    borderWidth: 1,
    height: 100,
    textAlignVertical: "top", // ensures text starts at the top
    paddingHorizontal: 10,
    marginVertical: 12,
    paddingVertical: 10,
    width: "90%",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
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
