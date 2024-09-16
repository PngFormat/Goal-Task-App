import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('denus');
  const [password, setPassword] = useState('1234');

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.username === username && user.password === password) {
          Alert.alert("Успешный вход", "Добро пожаловать!");
          navigation.navigate('Home');
        } else {
          Alert.alert("Ошибка", "Неверные имя пользователя или пароль");
        }
      } else {
        Alert.alert("Ошибка", "Пользователь не найден");
      }
    } catch (e) {
      console.error("Failed to login", e);
    }
  };
  

  return (
    <ImageBackground source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4IHBGQwRqf4xCHQwv9iokF4IRww7e-Kft7g&s'}} style={styles.background}>
      <Text style={styles.title}>Вход</Text>
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
      <View style={styles.container2}>
        <Button title="Войти" onPress={handleLogin} color='black' />
      </View>
      <View style={styles.container2}>
      <Button title="Регистрация" onPress={() => navigation.navigate('Register')} color='black' />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container2: {
    margin:10,
   alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: 350,
    borderBottomColor: 'white',
    borderRadius: 20,
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 16,
    color:'black',
    alignItems: 'center',
    marginLeft: 25,
  },
});
