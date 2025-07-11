import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import uuid from "react-native-uuid";
import StyledButton from "../components/GeneralButton";
import ImagePickerView from "../components/ImagePicker";
import { loadData, loadItemById, saveData } from "../hooks/useStorage";

import { useTheme } from "../contexts/ThemeContext";

export default function CrimeDetails() {
  const { themeStyles, themeColor } = useTheme();
  const params = useLocalSearchParams();
  const crimeId = params.crimeId;
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [checked, setChecked] = useState(false);

  const saveCrime = async () => {
    const existingCrimes = (await loadData("crimes")) || [];

    let newCrime;

    if (crimeId) {
      newCrime = {
        id: crimeId,
        title,
        date: date.toISOString(),
        description,
        solved: checked,
        image: imageUri || null,
      };

      const index = existingCrimes.findIndex((c) => c.id === crimeId);

      if (index !== -1) {
        existingCrimes[index] = newCrime;
      } else {
        existingCrimes.push(newCrime);
      }
    } else {
      newCrime = {
        id: uuid.v4(),
        title,
        date: date.toISOString(),
        description,
        solved: checked,
        image: imageUri || null,
      };

      existingCrimes.push(newCrime);
    }

    await saveData("crimes", existingCrimes);

    Alert.alert("Success", "Crime saved successfully.");
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
  }, [crimeId, themeColor]);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: themeStyles.backgroundColor }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ImagePickerView
            image={imageUri}
            setImage={setImageUri}
            title={title}
            setTitle={setTitle}
          />
          <View style={styles.detailsDiv}>
            <Text
              style={[styles.detailsTitle, { color: themeStyles.textColor }]}
            >
              Details
            </Text>
            <TextInput
              style={[styles.textArea, { color: themeStyles.textColor }]}
              placeholder="What happened?"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <StyledButton
            title={`Pick a date: ${date.toLocaleDateString()}`}
            onPress={() => setShowPicker(true)}
            color={themeStyles.secondaryColor}
            textColor={themeStyles.textColor}
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
                color={themeStyles.textColor}
                uncheckedColor="#999"
              />
            </View>
            <Text
              style={[styles.checkboxLabel, { color: themeStyles.textColor }]}
            >
              Solved?
            </Text>
          </View>
          <StyledButton
            title={"Save"}
            color={themeStyles.secondaryColor}
            textColor={themeStyles.textColor}
            onPress={saveCrime}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    textAlignVertical: "top",
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
