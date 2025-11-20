import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "mycontacts_v1";

export async function loadContacts() {
  try {
    const json = await AsyncStorage.getItem(KEY);
    if (!json) return [];
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error leyendo contactos:", e);
    return [];
  }
}

export async function saveContacts(list) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    console.log("Error saving:", e);
  }
}