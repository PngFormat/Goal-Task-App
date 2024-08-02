import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, Image, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch } from 'react-redux';

export default function CarsScreen({ navigation, route }) {
  const { savings, user }=  useSelector(state => state.user);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get('https://freetestapi.com/api/v1/cars')
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleCarPress = (car) => {
    navigation.navigate('CarDetails', { car, savings, user });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список машин</Text>
      <Button
        title="Вернуться назад"
        onPress={() => navigation.goBack()}
      />
      <FlatList
        data={cars}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => handleCarPress(item)}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>Модель: {item.model}</Text>
              <Text style={styles.details}>Год: {item.year}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});