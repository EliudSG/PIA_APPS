// screens/ContactDetailScreen.js
import { View, Text, TouchableOpacity, Platform, Alert } from "react-native";
import { useEffect, useState } from "react";
import stylesGlobal from "../styles/globalStyles";
import { saveContacts, loadContacts } from "../utils/storage";
import colors from "../styles/colors";

export default function ContactDetailScreen({ route, navigation }) {
  const { contact } = route.params;
  const [data, setData] = useState(contact);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadContacts().then((list) => {
        const updated = list.find((c) => c.id === data.id);
        if (updated) setData(updated);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const deleteContact = async () => {
    if (Platform.OS === "web") {
      const confirmDelete = window.confirm(
        `¿Seguro que deseas eliminar a ${data.name}?`
      );

      if (!confirmDelete) return;

      const list = await loadContacts();
      const newList = list.filter((c) => c.id !== data.id);
      await saveContacts(newList);
      navigation.navigate("Home");
      return;
    }

    Alert.alert(
      "Eliminar contacto",
      `¿Seguro que deseas eliminar a ${data.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const list = await loadContacts();
            const newList = list.filter((c) => c.id !== data.id);
            await saveContacts(newList);
            navigation.navigate("Home");
          },
        },
      ]
    );
  };

  return (
    <View style={stylesGlobal.container}>
      <TouchableOpacity
        style={{ marginBottom: 8, alignSelf: "flex-start" }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: colors.accent, fontWeight: "600", fontSize: 16 }}>
          ← Volver
        </Text>
      </TouchableOpacity>

      {/*info del contacto*/}
      <Text style={stylesGlobal.title}>{data.name}</Text>

      <Text style={{ marginTop: 10, fontSize: 16 }}>{data.phone}</Text>
      <Text style={{ fontSize: 16 }}>{data.email}</Text>
      <Text style={{ marginTop: 10, fontSize: 16 }}>{data.note}</Text>

      {/*botón EDITAR */}
      <TouchableOpacity
        style={[stylesGlobal.button, { marginTop: 30 }]}
        onPress={() => navigation.navigate("Form", { mode: "edit", contact: data })}
      >
        <Text style={stylesGlobal.buttonText}>Editar</Text>
      </TouchableOpacity>

      {/* botón ELIMINAR */}
      <TouchableOpacity
        style={[
          stylesGlobal.button,
          {
            backgroundColor: colors.danger,
            marginTop: 10,
            zIndex: 9999,
            elevation: 10,
            pointerEvents: "auto",
          },
        ]}
        onPress={deleteContact}
      >
        <Text style={stylesGlobal.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}
