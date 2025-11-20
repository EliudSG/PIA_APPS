import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

export default function ContactItem({ contact, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: { fontSize: 18, fontWeight: "600", color: colors.text },
  phone: { color: "#666", marginTop: 4 },
});