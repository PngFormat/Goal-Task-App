import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUserInfo = await AsyncStorage.getItem('userInfo');
        if (savedUserInfo != null) {
          const userData = JSON.parse(savedUserInfo);
          dispatch(setUser(userData));
        } else {
          const jsonValue = await AsyncStorage.getItem('user');
          if (jsonValue != null) {
            const userData = JSON.parse(jsonValue);
            dispatch(setUser(userData));
          } else {
            console.log('No user data found');
            navigation.navigate('Login');
          }
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
          <Text style={styles.email}>
            <Icon name="mail-outline" size={20} color="#666" /> {user.email || 'Не указано'} 
          </Text>
          <Text style={styles.info}>
            <Icon name="cash-outline" size={20} color="#666" /> Зарплата: {user.salary}
          </Text>
          <Text style={styles.info}>
            <Icon name="wallet-outline" size={20} color="#666" /> Сбережения:
          </Text>
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
          <Icon name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Редактировать профиль</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Выход</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cars', { savings: user.savings })}
          style={styles.button}
        >
          <Icon name="car-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Машины</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Task', { savings: user.savings })}
          style={styles.button}
        >
          <Icon name="checkmark-done-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Создать задачу</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Icon name="arrow-back-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Вернуться назад</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
