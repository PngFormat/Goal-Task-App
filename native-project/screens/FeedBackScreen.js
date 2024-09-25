import React, { useState,useRef,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ImageBackground,Animated } from 'react-native';

export default function FeedbackScreen({ navigation }) {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

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
    <ImageBackground source={{ uri: 'https://www.pngall.com/wp-content/uploads/2016/05/Audi-Free-Download-PNG.png' }} style={styles.background}>
    <View style={styles.overlay}>
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
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
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Вернуться назад</Text>
        </TouchableOpacity>
    </Animated.View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'80%',
    height:'50%',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#587580',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    marginBottom:10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
