import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import "react-native-reanimated";
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from "../contexts/ThemeContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <AppNavigator />
      <StatusBar style="light" />
    </CustomThemeProvider>
  );
}

function AppNavigator() {
  const router = useRouter();
  const { themeStyles } = useTheme(); // Now safe to use here

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: () => (
          <HeaderTitle routeName={route.name} router={router} />
        ),
        headerStyle: {
          backgroundColor: themeStyles.backgroundColor,
        },
        headerTintColor: themeStyles.textColor,
      })}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="crimeDetail" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}

function HeaderTitle({ routeName, router }) {
  const { themeStyles } = useTheme();

  const showAddIcon = routeName === "index";
  const showSettingsIcon = routeName !== "settings";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingRight: 12,
        paddingLeft: 12,
        backgroundColor: themeStyles.backgroundColor,
      }}
    >
      <Text
        style={{
          color: themeStyles.textColor,
          fontSize: 22,
          fontWeight: "bold",
          fontFamily: "Roboto_700Bold",
        }}
      >
        Criminal Intent
      </Text>

      <View style={{ flexDirection: "row", gap: 16 }}>
        {showAddIcon && (
          <Pressable
            onPress={() => router.push("/crimeDetail")}
            hitSlop={10}
            style={{ marginRight: 8 }}
          >
            <MaterialIcons name="add" size={28} color={themeStyles.textColor} />
          </Pressable>
        )}
        {showSettingsIcon && (
          <Pressable
            onPress={() => router.push("/settings")}
            hitSlop={10}
            style={{ marginRight: 4 }}
          >
            <MaterialIcons
              name="settings"
              size={28}
              color={themeStyles.textColor}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
