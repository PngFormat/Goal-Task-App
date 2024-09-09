import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, Alert } from 'react-native';
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
          placeholderTextColor="#2c2c2c"
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
          <Button
            title="Создать"
            onPress={handleSaveData}
          />
        </View>

        <View style={styles.columnBtn}>
          <Button
            title="Посмотреть задачи"
            onPress={() => navigation.navigate('OutputTask')}
          />
          <Button
                title="Вернуться назад"
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
  },
  columnBtn: {
    marginHorizontal: 50,
    paddingVertical: 20,
    marginBottom: 15,
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
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
