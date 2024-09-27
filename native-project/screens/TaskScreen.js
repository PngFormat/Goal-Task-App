import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TextInput, ImageBackground, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePickerExample from '../ImagePicker/ImagePick'; 
import { add_goal } from '../redux/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutButton from '../components/logoutButton';

export default function TaskScreen({ route, navigation }) {
  const user = useSelector((state) => state.user);
  const goals = useSelector((state) => state.goals.goals);
  const id = useSelector((state) => state.goals.id);
  const [textTask, setTextTask] = useState('');
  const [textInfo, setTextInfo] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleSaveData = async () => {
    const newGoal = { goal: textTask, textInfo, imageUri: selectedImage };
    dispatch(add_goal(newGoal));
    setTextTask('');
    setTextInfo('');

    try {
      await AsyncStorage.setItem('goals', JSON.stringify([...goals, { ...newGoal, id }]));
      Alert.alert('Успешно', 'Задача успешно добавлена');
    } catch (e) {
      console.error('Ошибка сохранения задач', e);
    }
  };

  return (
      <View style={styles.container}>
        <LogoutButton navigation={navigation}/>
        <Text style={styles.title}>Создание задачи</Text>
        <Text style={styles.label}>Ваши сбережения: {user.savings} $</Text>
        
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

        {/* <ImagePickerExample setSelectedImage={setSelectedImage} /> */}
        
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSaveData}>
          <Text style={styles.buttonText}>Создать</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('OutputTask')}>
          <Text style={styles.buttonText}>Посмотреть задачи</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.goalButton} onPress={() => navigation.navigate('SetGoals')}>
          <Icon name="trophy-outline" size={20} color="#fff" />
          <Text style={styles.goalButtonText}>Создать цель</Text>
        </TouchableOpacity>
      </View>
  
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
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    elevation: 3, 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  secondaryButton: {
    backgroundColor: '#555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
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
    borderWidth: 1,
    borderColor: '#ddd', 
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  goalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f39c12',
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
    elevation: 3,
  },
  goalButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
});
