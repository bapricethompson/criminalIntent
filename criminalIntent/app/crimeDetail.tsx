import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import ImagePickerView from "../components/ImagePicker";
import StyledButton from "../components/GeneralButton";
import { Checkbox } from "react-native-paper";
import uuid from "react-native-uuid";
import { loadData, saveData, loadItemById } from "../hooks/useStorage";
import { useRouter } from "expo-router";

export default function CrimeDetails() {
  const params = useLocalSearchParams();
  const crimeId = params.crimeId;
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const saveCrime = async () => {
    const newCrime = {
      id: uuid.v4(),
      title,
      date: date.toISOString(), // store as ISO string
      description,
      solved: checked,
      image: imageUri || null,
    };
    console.log(newCrime);
    const existingCrimes = (await loadData("crimes")) || [];
    console.log(existingCrimes);
    const updatedCrimes = [...existingCrimes, newCrime];
    console.log(updatedCrimes);
    await saveData("crimes", updatedCrimes);
    router.replace("/"); // or router.back() if you're pushing from index
  };

  useEffect(() => {
    const loadCrime = async () => {
      const crime = await loadItemById("crimes", crimeId);
      if (crime) {
        setTitle(crime.title || "");
        setImageUri(crime.image || null);
        setDescription(crime.description || "");
        setDate(new Date(crime.date));
        setChecked(crime.solved || false);
      }
    };

    loadCrime();
  }, [crimeId]);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View>
      <ImagePickerView
        image={imageUri}
        setImage={setImageUri}
        title={title}
        setTitle={setTitle}
      />
      <View style={styles.detailsDiv}>
        <Text style={styles.detailsTitle}>Details</Text>
        <TextInput
          style={styles.textArea}
          placeholder="What happened?"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <StyledButton
        title={`Pick a date: ${date.toLocaleDateString()}`}
        onPress={() => setShowPicker(true)}
      />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxBorder}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
            color="purple"
            uncheckedColor="#999"
          />
        </View>
        <Text style={styles.checkboxLabel}>Solved?</Text>
      </View>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginLeft: 26,
  },
  checkboxLabel: {
    fontSize: 18,
    marginRight: 8,
    marginLeft: 8,
  },
  checkboxBorder: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    padding: 2,
    margin: 2,
  },
});
