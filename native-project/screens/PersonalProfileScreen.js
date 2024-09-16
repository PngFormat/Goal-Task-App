import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userInfo');
        if (jsonValue != null) {
          const userData = JSON.parse(jsonValue);
          dispatch(setUser(userData));
        } else {
          console.log('No user data found');
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
      dispatch(setUser(updatedUser));
      await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
    } catch (e) {
      Alert.alert('Ошибка при сохранении данных');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      dispatch(setUser(null));
      Alert.alert('Вы вышли из системы');
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('Ошибка при выходе из системы');
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
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.info}>Зарплата: {user.salary}</Text>
          <Text style={styles.info}>Сбережения: </Text>
          {user.savings && user.savings.length > 0 ? (
            user.savings.map((saving, index) => (
              <Text key={index} style={styles.savingsItem}>
                {`Месяц ${index + 1}: ${saving}`}
              </Text>
            ))
          ) : (
            <Text style={styles.savingsItem}>Нет данных о сбережениях</Text>
          )}
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
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Выход</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cars', { savings: user.savings })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Машины</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Task', { savings: user.savings })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Создать задачу</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Вернуться назад</Text>
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
  savingsItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
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
