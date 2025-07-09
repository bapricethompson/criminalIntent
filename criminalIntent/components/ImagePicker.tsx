import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  TextInput,
  View,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "./IconButton";

export default function ImagePickerView() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.titleDiv}>
      <View style={styles.imageSection}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
        <IconButton onPress={pickImage} />
      </View>
      <View style={styles.textDiv}>
        <Text style={styles.titleText}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={text}
          onChangeText={setText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleDiv: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  imageSection: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  placeholder: {
    width: 150,
    height: 150,
    backgroundColor: "#ccc",
    borderRadius: 8,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  textDiv: {
    marginLeft: 20,
    marginRight: 20,
    width: "40%",
  },
  input: {
    height: 40,
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginTop: 12,
    marginBottom: 12,
    width: "100%", // ensures it stretches
    borderWidth: 0, // removes other borders
    borderRadius: 0, // no rounded corners
  },
});
