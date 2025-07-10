import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text, View, Pressable } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={({ route }) => {
          // Screens where you want to hide the Add icon
          const hideAddIconScreens = ["addCrime", "someOtherScreen"];

          const showAddIcon = !hideAddIconScreens.includes(route.name);

          return {
            headerShown: true,
            headerTitle: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingRight: 12,
                  paddingLeft: 12,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    fontWeight: "bold",
                    fontFamily: "Roboto_700Bold",
                  }}
                >
                  Criminal Intent
                </Text>

                {showAddIcon && (
                  <Pressable
                    onPress={() => router.push("/crimeDetail")}
                    hitSlop={10}
                    style={{ marginRight: 8 }}
                  >
                    <MaterialIcons name="add" size={28} color="white" />
                  </Pressable>
                )}
              </View>
            ),
            headerStyle: {
              backgroundColor: "purple",
            },
            headerTintColor: "white",
          };
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="crimeDetail" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
