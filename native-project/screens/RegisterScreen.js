import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savings, setSavings] = useState('');

  const handleRegister = async () => {
    const user = {
      username,
      password,
      savings: parseFloat(savings),
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert("Регистрация успешна", "Теперь вы можете войти в систему");
      navigation.navigate('Login');
    } catch (e) {
      console.error("Failed to register user", e);
    }
  };
  console.log(AsyncStorage.getItem('user'))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Начальные сбережения"
        value={savings}
        onChangeText={setSavings}
        keyboardType="numeric"
      />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
