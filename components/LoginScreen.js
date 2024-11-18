import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { db } from '../database/database';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateFields = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'E-mail e senha são obrigatórios.');
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!validateFields()) return;

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            navigation.navigate('Home');
          } else {
            Alert.alert('Erro', 'E-mail ou senha incorretos.');
          }
        },
        (txObj, error) => {
          console.log('Error during login', error);
          Alert.alert('Erro', 'Ocorreu um erro ao tentar realizar o login.');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
        Não tem uma conta? Cadastre-se.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  registerText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 15,
  },
});
