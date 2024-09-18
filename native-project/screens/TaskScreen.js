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
          placeholderTextColor="#fff"
        />
        <Text style={styles.label}>Введите описание</Text>
        <TextInput
          style={styles.input}
          value={textInfo}
          onChangeText={setTextInfo}
        />
        
        <ImagePickerExample setSelectedImage={setSelectedImage} />
        
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}

        <View style={styles.columnBtn}>
          <TouchableOpacity style={styles.button} onPress={handleSaveData}>
            <Text style={styles.buttonText}>Создать</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.columnBtn}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OutputTask')}>
            <Text style={styles.buttonText}>Посмотреть задачи</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Вернуться назад</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
  },
  columnBtn: {
    width: '100%',
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'black',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
