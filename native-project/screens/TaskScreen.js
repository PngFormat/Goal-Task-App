import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TextInput, ImageBackground, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePickerExample from '../ImagePicker/ImagePick'; 
import { add_goal } from '../redux/actions';

export default function TaskScreen({ route, navigation }) {
  const user = useSelector((state) => state.user);
  const goals = useSelector((state) => state.goals.goals);
  const id = useSelector((state) => state.goals.id);
  const [textTask, setTextTask] = useState('');
  const [textInfo, setTextInfo] = useState('');
  const [numberGoal, setNumberGoal] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleSaveData = async () => {
    const newGoal = { goal: textTask, textInfo, imageUri: selectedImage };
    dispatch(add_goal(newGoal));
    setTextTask('');
    setTextInfo('');
    setNumberGoal(numberGoal + 1);

    try {
      await AsyncStorage.setItem('goals', JSON.stringify([...goals, { ...newGoal, id }]));
      Alert.alert('Успешно', 'Задача успешно добавлена');
    } catch (e) {
      console.error('Ошибка сохранения задач', e);
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://sendsay.ru/blog/storage/2022/05/27/9e784a3c95f20eec8aa4c324d2f54caa880956bb.png' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Создание задачи</Text>
        <Text style={styles.label}>Ваши сбережения: {user.savings}</Text>
        <Text style={styles.label}>Введите цель</Text>
        <TextInput
          style={styles.input}
          value={textTask}
          onChangeText={setTextTask}
          placeholder="Введите цель"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.label}>Введите описание</Text>
        <TextInput
          style={styles.input}
          value={textInfo}
          onChangeText={setTextInfo}
          placeholder="Введите описание"
          placeholderTextColor="#aaa"
        />
        
        <ImagePickerExample setSelectedImage={setSelectedImage} />
        
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSaveData}>
          <Text style={styles.buttonText}>Создать</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('OutputTask')}>
          <Text style={styles.buttonText}>Посмотреть задачи</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Вернуться назад</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
  
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  secondaryButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

