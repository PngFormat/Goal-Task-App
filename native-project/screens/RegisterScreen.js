import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savings, setSavings] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !savings) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    const savingsValue = parseFloat(savings);
    if (isNaN(savingsValue)) {
      Alert.alert('Ошибка', 'Сбережения должны быть числом.');
      return;
    }

    const user = {
      username,
      password,
      savings: savingsValue,
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Регистрация успешна', 'Теперь вы можете войти в систему');
      navigation.navigate('Login');
    } catch (e) {
      console.error('Failed to register user', e);
      Alert.alert('Ошибка', 'Не удалось зарегистрировать пользователя.');
    }
  };

  return (
    <ImageBackground source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4IHBGQwRqf4xCHQwv9iokF4IRww7e-Kft7g&s'}} style={styles.background}>
      <View style={styles.overlay}>

      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#bbb"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#bbb"
      />
      <TextInput
        style={styles.input}
        placeholder="Начальные сбережения"
        value={savings}
        onChangeText={setSavings}
        keyboardType="numeric"
        placeholderTextColor="#bbb"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
 
  backButton: {
    marginTop: 20,
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
