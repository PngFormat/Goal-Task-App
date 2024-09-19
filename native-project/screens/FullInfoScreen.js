import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, ImageBackground, View, Image, Button, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

export default function FullInfoScreen({ route, navigation }) {
  const { car, savings } = route.params;
  const [monthsToSave, setMonthsToSave] = useState(0);
  const [progress, setProgress] = useState(0);
  const [difference, setDifference] = useState(0);
  const [futureSavings, setFutureSavings] = useState(0);

  useEffect(() => {
    const calculateMetrics = () => {
      if (savings > 0) {
        const months = Math.ceil(car.price / savings);
        setMonthsToSave(months);
        setProgress(Math.min(savings / car.price, 1));
        setDifference(car.price - savings);
        setFutureSavings(savings * 12);
      }
    };
    calculateMetrics();
  }, [savings, car.price]);

  return (
    <ImageBackground source={{ uri: 'https://www.seekpng.com/png/small/775-7757471_2018-audi-a6-audi-2018-front.png' }} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={{ uri: car.image }} style={styles.image} />
          <Text style={styles.name}>{car.name}</Text>
          <Text style={styles.details}>Model: {car.model}</Text>
          <Text style={styles.details}>Year: {car.year}</Text>
          <Text style={styles.details}>Color: {car.color}</Text>
          <Text style={styles.details}>Price: {car.price} $</Text>

          {monthsToSave > 0 && (
            <Text style={styles.result}>
              You need to save for {monthsToSave} months at the current savings rate of {savings} $ per month.
            </Text>
          )}

          <Text style={styles.userSavings}>
            Your current savings: {savings} $
          </Text>

          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} width={200} height={15} color='#6200EE' borderWidth={0} />
            <Text style={styles.progressText}>{(progress * 100).toFixed(2)}%</Text>
          </View>

          <Text style={styles.additionalInfo}>
            Difference to goal: {difference} $
          </Text>
          <Text style={styles.additionalInfo}>
            Estimated future savings (in a year): {futureSavings} $
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CarInfo', { car, savings })}>
            <Text style={styles.buttonText}>More Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    margin: 16,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    fontWeight: '500',
  },
  result: {
    fontSize: 16,
    color: '#444',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  userSavings: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  additionalInfo: {
    fontSize: 16,
    color: '#FF5722',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 4,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: '500',
  },
});
