import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, Image, View, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar'; 
import { MaterialIcons } from '@expo/vector-icons';
import LoadingAnimation from '../components/loadingIndicator';

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
      <LoadingAnimation/>
    );
  }

  const savingsPercentage = Math.min((savings / car.price) * 100, 100);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: car.image }} style={styles.image} />
      </View>
      <View styles={styles.containerCar}>
      <Text style={styles.title}>{car.make} {car.model}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}><MaterialIcons name="event" size={16} color="#ff4081" /> {car.year}</Text>
        <Text style={styles.details}><MaterialIcons name="palette" size={16} color="#ff4081" /> {car.color}</Text>
        <Text style={styles.details}><MaterialIcons name="speed" size={16} color="#ff4081" /> {car.mileage} km</Text>
        <Text style={styles.details}><MaterialIcons name="attach-money" size={16} color="#ff4081" /> ${car.price}</Text>
        <Text style={styles.details}><MaterialIcons name="local-gas-station" size={16} color="#ff4081" /> {car.fuelType}</Text>
        <Text style={styles.details}><MaterialIcons name="gear" size={16} color="#ff4081" /> {car.transmission}</Text>
        <Text style={styles.details}><MaterialIcons name="engine" size={16} color="#ff4081" /> {car.engine}</Text>
        <Text style={styles.details}><MaterialIcons name="power" size={16} color="#ff4081" /> {car.horsepower} hp</Text>
        <Text style={styles.details}><MaterialIcons name="person" size={16} color="#ff4081" /> {car.owners}</Text>
      </View>
      <Text style={styles.featuresTitle}>Features:</Text>
      {car.features.map((feature, index) => (
        <Text key={index} style={styles.feature}><MaterialIcons name="star" size={16} color="#ff4081" /> {feature}</Text>
      ))}

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Savings: {savingsPercentage.toFixed(2)}%</Text>
        <ProgressBar
          progress={savingsPercentage / 100}
          width={300}
          color="#ff4081"
          borderColor="transparent"
          unfilledColor="#e0e0e0"
          borderWidth={0}
          height={8}
        />
      </View>

          <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.buttonText}>Back</Text>
    </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7be8d0',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#8ad6f2',
  },
  backButton: {
    backgroundColor: '#0c4357',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  containerCar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#7be8d0',
    borderRadius: 16,
    margin: 16,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    color: '#555',
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    color: '#333',
  },
  feature: {
    fontSize: 16,
    fontWeight: '800',
    color: '#555',
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
});
