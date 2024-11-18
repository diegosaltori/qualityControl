import React, { useState } from 'react';
import { ScrollView, TextInput, Button, StyleSheet, View, Text } from 'react-native';

export default function FormScreen({ route, navigation }) {
  const { item } = route.params || {};
  const [formData, setFormData] = useState(item || {});

  const handleSave = () => {
    // Salvar no banco de dados
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Título"
        style={styles.input}
        value={formData.titulo}
        onChangeText={(text) => setFormData({ ...formData, titulo: text })}
      />
      <TextInput
        placeholder="Descrição"
        style={[styles.input, styles.textArea]}
        value={formData.descricao}
        multiline
        numberOfLines={5}
        onChangeText={(text) => setFormData({ ...formData, descricao: text })}
      />
      {/* Adicione outros campos aqui */}
      <Button title="Salvar" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
});
