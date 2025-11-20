import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import stylesGlobal from "../styles/globalStyles";
import { saveContacts, loadContacts } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";
function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export default function ContactFormScreen({ navigation, route }) {
  const { mode, contact } = route.params || {};
  const isEdit = mode === "edit";

  const [name, setName] = useState(contact?.name || "");
  const [phone, setPhone] = useState(contact?.phone || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [note, setNote] = useState(contact?.note || "");

  async function save() {
    if (!name.trim()) return;

    let list = await loadContacts();

    if (isEdit) {
      list = list.map((c) =>
        c.id === contact.id ? { ...c, name, phone, email, note } : c
      );
    } else {
      list.push({
        id: generarId(),
        name,
        phone,
        email,
        note,
      });
    }

    await saveContacts(list);
    navigation.goBack();
  }

  return (
    <View style={stylesGlobal.container}>
      <TextInput
        style={stylesGlobal.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={stylesGlobal.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={stylesGlobal.input}
        placeholder="Email (opcional)"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[stylesGlobal.input, { height: 100 }]}
        placeholder="Nota (opcional)"
        value={note}
        multiline
        onChangeText={setNote}
      />

      <TouchableOpacity style={stylesGlobal.button} onPress={save}>
        <Text style={stylesGlobal.buttonText}>
          {isEdit ? "Guardar cambios" : "Crear contacto"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
