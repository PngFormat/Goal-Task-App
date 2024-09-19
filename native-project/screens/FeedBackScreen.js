import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function FeedbackScreen({ navigation }) {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Ошибка', 'Пожалуйста, введите отзыв.');
      return;
    }

    Alert.alert('Спасибо!', 'Ваш отзыв был отправлен.');
    setFeedback('');
    setEmail('');

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Оставьте отзыв</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ваш отзыв"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Ваша почта (необязательно)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Отправить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
