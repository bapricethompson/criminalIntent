import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import uuid from "react-native-uuid";
import ListItem from "../components/ListItem";
import { useTheme } from "../contexts/ThemeContext";
import { loadData, saveData } from "../hooks/useStorage";

const defaultCrimes = [
  {
    id: uuid.v4(),
    title: "Burglary",
    date: "2025-07-01",
    description:
      "Forced entry reported at an apartment in downtown. Several electronics stolen.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Vandalism ",
    date: "2025-06-28",
    description:
      "Graffiti and damage to playground equipment reported overnight.",
    solved: true,
  },
  {
    id: uuid.v4(),
    title: "Car Theft ",
    date: "2025-06-30",
    description: "Black sedan stolen from residential driveway.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Shoplifting ",
    date: "2025-07-02",
    description: "Suspect caught on camera stealing clothing items.",
    solved: true,
  },
  {
    id: uuid.v4(),
    title: "Assault ",
    date: "2025-07-03",
    description: "Physical altercation reported; victim hospitalized.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Hit and Run ",
    date: "2025-06-29",
    description: "Driver fled scene after colliding with parked car.",
    solved: true,
  },
  {
    id: uuid.v4(),
    title: "Fraud",
    date: "2025-07-01",
    description:
      "Multiple unauthorized transactions reported on victim’s account.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Arson",
    date: "2025-07-04",
    description: "Fire intentionally set causing extensive damage.",
    solved: true,
  },
  {
    id: uuid.v4(),
    title: "Identity Theft",
    date: "2025-06-27",
    description: "Victim reports someone used personal info to open accounts.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Illegal Drug",
    date: "2025-07-05",
    description:
      "Suspect found with controlled substances during traffic stop.",
    solved: true,
  },
];

export default function HomeScreen() {
  const [crimes, setCrimes] = useState([]);
  const { themeStyles, themeColor } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const loadCrimes = async () => {
        let storedCrimes = await loadData("crimes");
        if (!storedCrimes) {
          await saveData("crimes", defaultCrimes);
          storedCrimes = defaultCrimes;
        }
        setCrimes(storedCrimes);
      };

      loadCrimes();
    }, [themeColor]) // 👈 ADD THIS
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <FlatList
        data={crimes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`../crimeDetail?crimeId=${item.id}`} asChild>
            <Pressable>
              <ListItem
                title={item.title}
                date={item.date}
                solved={item.solved}
                textColor={themeStyles.textColor}
                backgroundColor={themeStyles.secondaryColor}
              />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    fontSize: 24,
    marginVertical: 10,
  },
});
