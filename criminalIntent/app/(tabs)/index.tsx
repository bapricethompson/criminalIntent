import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import ListItem from "../../components/ListItem";
import crimes from "../../data/crimes";
import { Link } from "expo-router";
import { loadData, saveData } from "../../hooks/useStorage";
import uuid from "react-native-uuid";

const defaultCrimes = [
  {
    id: uuid.v4(),
    title: "Burglary at Downtown Apartment",
    date: "2025-07-01",
    description:
      "Forced entry reported at an apartment in downtown. Several electronics stolen.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Vandalism at City Park",
    date: "2025-06-28",
    description:
      "Graffiti and damage to playground equipment reported overnight.",
    solved: true,
  },
  {
    id: uuid.v4(),
    title: "Car Theft on Maple Street",
    date: "2025-06-30",
    description: "Black sedan stolen from residential driveway.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Shoplifting at Main Street Store",
    date: "2025-07-02",
    description: "Suspect caught on camera stealing clothing items.",
    solved: true,
  },
  {
    id: uuid.v4(),
    title: "Assault near Riverside Mall",
    date: "2025-07-03",
    description: "Physical altercation reported; victim hospitalized.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Hit and Run on 5th Avenue",
    date: "2025-06-29",
    description: "Driver fled scene after colliding with parked car.",
    solved: true,
  },
  {
    id: uuid.v4(),
    title: "Fraudulent Credit Card Charges",
    date: "2025-07-01",
    description:
      "Multiple unauthorized transactions reported on victim’s account.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Arson at Abandoned Warehouse",
    date: "2025-07-04",
    description: "Fire intentionally set causing extensive damage.",
    solved: true,
  },
  {
    id: uuid.v4(),
    title: "Identity Theft Complaint",
    date: "2025-06-27",
    description: "Victim reports someone used personal info to open accounts.",
    solved: false,
  },
  {
    id: uuid.v4(),
    title: "Illegal Drug Possession Arrest",
    date: "2025-07-05",
    description:
      "Suspect found with controlled substances during traffic stop.",
    solved: true,
  },
];

export default function HomeScreen() {
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    async function loadCrimes() {
      let storedCrimes = await loadData("crimes");
      if (!storedCrimes) {
        // No data saved yet — save defaults
        await saveData("crimes", defaultCrimes);
        storedCrimes = defaultCrimes;
      }
      setCrimes(storedCrimes);
    }
    loadCrimes();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={crimes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`../crimeDetail?crimeId=${item.id}`} asChild>
            <Pressable>
              <ListItem title={item.title} date={item.date} />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10,
  },
  item: {
    fontSize: 24,
    marginVertical: 10,
  },
});
