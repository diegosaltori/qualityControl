import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';

const mockData = [
  { id: '1', titulo: 'Título 1', origem: 'Auditoria Interna', status: 'Aberta' },
  { id: '2', titulo: 'Título 2', origem: 'Reclamação do Cliente', status: 'Encerrada Efetiva' },
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.titulo}</Text>
      <Text>{item.origem}</Text>
      <Text>{item.status}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('Form', { item })} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
