import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions'

export default function ProfileScreen({ navigation }) {
 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
          const userData = JSON.parse(jsonValue);
          dispatch(setUser(userData));
        } else {
          navigation.navigate('Login');
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    };

    loadUserData();
  }, [dispatch, navigation]);

  const handleUpdateProfile = async (updatedUser) => {
    try {
      // Dispatch the action to update the user in Redux
      dispatch(setUser(updatedUser));
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (e) {
      Alert.alert('Ошибка при сохранении данных');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://www.pngall.com/wp-content/uploads/2016/05/Audi-Free-Download-PNG.png' }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.info}>Зарплата: {user.salary}</Text>
          <Text style={styles.info}>Сбережения: {user.savings}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile', { user, onUpdate: handleUpdateProfile })}
        >
          <Text style={styles.buttonText}>Редактировать профиль</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert('Вы вышли из системы');
          }}
        >
          <Text style={styles.buttonText}>Выход</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Просмотр машин"
          onPress={() => navigation.navigate('Cars', { savings: user.savings })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Машины</Text>
          </TouchableOpacity>

          <TouchableOpacity
          title="Задача"
          onPress={() => navigation.navigate('Task', { savings: user.savings })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Создать задачу</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
