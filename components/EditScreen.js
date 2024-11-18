import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../database/database';

export default function EditScreen({ route, navigation }) {
  const { item } = route.params; // Recebe os dados do item passado da HomeScreen

  const [titulo, setTitulo] = useState(item.titulo);
  const [descricao, setDescricao] = useState(item.descricao);
  const [status, setStatus] = useState(item.status);
  const [origem, setOrigem] = useState(item.origem);
  const [responsavel, setResponsavel] = useState(item.responsavel);
  const [emailResponsavel, setEmailResponsavel] = useState(item.emailResponsavel);
  // Defina outros campos conforme necessário

  const handleSave = () => {
    // Atualiza os dados do banco com as novas informações
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE registros SET titulo = ?, descricao = ?, status = ?, origem = ?, responsavel = ?, emailResponsavel = ? WHERE id = ?',
        [titulo, descricao, status, origem, responsavel, emailResponsavel, item.id],
        () => {
          Alert.alert('Sucesso', 'Item atualizado com sucesso!');
          navigation.goBack(); // Volta para a tela anterior (HomeScreen)
        },
        (txObj, error) => {
          console.log('Erro ao atualizar item', error);
          Alert.alert('Erro', 'Ocorreu um erro ao atualizar o item.');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />
      <TextInput
        placeholder="Status"
        style={styles.input}
        value={status}
        onChangeText={setStatus}
      />
      <TextInput
        placeholder="Origem"
        style={styles.input}
        value={origem}
        onChangeText={setOrigem}
      />
      <TextInput
        placeholder="Responsável"
        style={styles.input}
        value={responsavel}
        onChangeText={setResponsavel}
      />
      <TextInput
        placeholder="E-mail do Responsável"
        style={styles.input}
        value={emailResponsavel}
        onChangeText={setEmailResponsavel}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
