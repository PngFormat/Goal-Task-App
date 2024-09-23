import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { setUser } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
          const userData = JSON.parse(jsonValue);
          console.log('user', userData);
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

  return (
    <ImageBackground source={{ uri: 'https://www.pngall.com/wp-content/uploads/2016/05/Audi-Free-Download-PNG.png' }} style={styles.background}>
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.contactIcon} 
          onPress={() => navigation.navigate('Contact')}
        >
          <Icon name="call-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Добро пожаловать!</Text>
        {user ? (
        <Text style={styles.subtitle}>
        Сбережения: {user?.savings ? user.savings.toLocaleString() : 0}
      </Text>
      
        ) : (
          <Text style={styles.subtitle}>Загрузка сбережений...</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('About', { salary: user?.salary, savings: user?.savings || 0 })}
          >
            <Text style={styles.buttonText}>О приложении</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Details', { savings: user?.savings || 0 })}
          >
            <Text style={styles.buttonText}>Детали</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Report', { savings: user?.savings || 0 })}
          >
            <Text style={styles.buttonText}>Отчеты</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Cars', { savings: user?.savings || 0 })}
          >
            <Text style={styles.buttonText}>Машины</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile', { user })}
          >
            <Text style={styles.buttonText}>Профиль</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contactIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
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
