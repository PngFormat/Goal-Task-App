import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, Image, View, ScrollView, ActivityIndicator, ProgressBarAndroid } from 'react-native';
import axios from 'axios';

export default function AboutCar({ navigation, route }) {
  const { car, savings } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  const savingsPercentage = Math.min((savings / car.price) * 100, 100);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: car.image }} style={styles.image} />
      <Text style={styles.title}>{car.make} {car.model}</Text>
      <Text style={styles.details}>Год: {car.year}</Text>
      <Text style={styles.details}>Цвет: {car.color}</Text>
      <Text style={styles.details}>Пробег: {car.mileage} км</Text>
      <Text style={styles.details}>Цена: {car.price} $</Text>
      <Text style={styles.details}>Тип топлива: {car.fuelType}</Text>
      <Text style={styles.details}>Коробка передач: {car.transmission}</Text>
      <Text style={styles.details}>Двигатель: {car.engine}</Text>
      <Text style={styles.details}>Мощность: {car.horsepower} л.с.</Text>
      <Text style={styles.details}>Количество владельцев: {car.owners}</Text>
      <Text style={styles.featuresTitle}>Особенности:</Text>
      {car.features.map((feature, index) => (
        <Text key={index} style={styles.feature}>{feature}</Text>
      ))}

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Сбережения: {savingsPercentage.toFixed(2)}%</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={savingsPercentage / 100}
          color="#00bfff"
        />
      </View>

      <Button
        title="Вернуться назад"
        onPress={() => navigation.goBack()}
        color="#00bfff"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  details: {
    fontSize: 18,
    marginBottom: 5,
    color: '#666',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  feature: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
});
