import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../database/database'; // Supondo que você tenha configurado o banco corretamente

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  // Função para buscar os dados do banco
  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM registros', // Ajuste o nome da tabela para o que você criou
        [],
        (txObj, resultSet) => {
          let registros = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            registros.push(resultSet.rows.item(i));
          }
          setData(registros); // Atualiza o estado com os dados obtidos
        },
        (txObj, error) => {
          console.log('Erro ao buscar dados', error);
          Alert.alert('Erro', 'Ocorreu um erro ao carregar os registros.');
        }
      );
    });
  };

  // Carregar os dados quando o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  // Renderizar cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.titulo}</Text>
      <Text>{item.origem}</Text>
      <Text>{item.status}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('Edit', { item })} />

    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // Garantir que a chave seja uma string
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
