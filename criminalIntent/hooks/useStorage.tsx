import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

export const loadData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load data", e);
  }
  return null;
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Failed to remove data", e);
  }
};

export const loadItemById = async (key, id) => {
  try {
    const data = await loadData(key);
    if (Array.isArray(data)) {
      return data.find((item) => item.id === id) || null;
    }
  } catch (e) {
    console.error(`Failed to load item by id (${id}) from ${key}`, e);
  }
  return null;
};

const THEME_KEY = "appTheme";

export const saveTheme = async (theme) => {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error("Failed to save theme", e);
  }
};

export const loadTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_KEY);
    return theme || "light";
  } catch (e) {
    console.error("Failed to load theme", e);
    return "light";
  }
};
