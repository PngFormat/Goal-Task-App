import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { setUser } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue != null) {
          const userData = JSON.parse(jsonValue);
          console.log('user' ,userData)
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
      <Text style={styles.title}>Добро пожаловать!</Text>
      {user ? (
        <Text style={styles.subtitle}>Сбережения: {user.savings || 0}</Text>
      ) : (
        <Text style={styles.subtitle}>Загрузка сбережений...</Text>
      )}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="О приложении"
            onPress={() => navigation.navigate('About', {salary: user?.salary, savings: user?.savings || 0 })} 
            color="blue"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Детали"
            onPress={() => navigation.navigate('Details', { savings: user?.savings || 0 })}
            color="blue"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Отчеты"
            onPress={() => navigation.navigate('Report', { savings: user?.savings || 0 })}
            color="blue"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Машины"
            onPress={() => navigation.navigate('Cars', { savings: user?.savings || 0 })}
            color="blue"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Профиль"
            onPress={() => {
              navigation.navigate('Profile', { user });
            }}
            color="blue"
          />
        </View>
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
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginBottom: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
