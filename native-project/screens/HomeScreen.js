import React, { useEffect, useRef, useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Animated, ActivityIndicator, Alert } from 'react-native';
import { setUser } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  const loadUserData = useCallback(async () => {
    try {
      const jsonValue = await SecureStore.getItemAsync('user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        dispatch(setUser(userData));
      } else {
        Alert.alert('','Успешно')
      }
    } catch (e) {
      console.error("Failed to load user data", e);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigation]);

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(100);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    loadUserData();
  }, [fadeAnim, slideAnim, loadUserData]);

  const renderButtons = () => (
    <>
      <Button title="О приложении" onPress={() => navigation.navigate('About', { salary: user?.salary, savings: user?.savings || 0 })} />
      <Button title="Детали" onPress={() => navigation.navigate('Details', { savings: user?.savings || 0 })} />
      <Button title="Отчеты" onPress={() => navigation.navigate('Report', { savings: user?.savings || 0 })} />
      <Button title="Машины" onPress={() => navigation.navigate('Cars', { savings: user?.savings || 0 })} />
      <Button title="Профиль" onPress={() => navigation.navigate('Profile', { user })} />
    </>
  );

  return (
    <ImageBackground source={{ uri: 'https://www.pngall.com/wp-content/uploads/2016/05/Audi-Free-Download-PNG.png' }} style={styles.background}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.contactIcon} onPress={() => navigation.navigate('Contact')}>
          <Icon name="call-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Добро пожаловать!</Animated.Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.subtitle}>Сбережения: {user?.savings ? user.savings.toLocaleString() : 0}</Text>
        )}

        <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: slideAnim }] }]}>
          {renderButtons()}
        </Animated.View>
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const Button = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

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
