import React, { useState, useEffect } from 'react';
import { ScrollView,StyleSheet, Text, ImageBackground, View, Image, Button } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

export default function FullInfoScreen({ route, navigation }) {
  const { car, savings, user } = route.params;
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
        <Text style={styles.details}>Модель: {car.model}</Text>
        <Text style={styles.details}>Год: {car.year}</Text>
        <Text style={styles.details}>Цвет: {car.color}</Text>
        <Text style={styles.details}>Цена: {car.price} $</Text>

        {monthsToSave > 0 && (
          <Text style={styles.result}>
            Вам нужно копить {monthsToSave} месяцев при текущих ежемесячных сбережениях {savings} $.
          </Text>
        )}

        <Text style={styles.userSavings}>
          Ваши текущие сбережения: {savings} $
        </Text>

        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} width={200} height={20} color={'#007BFF'} />
          <Text style={styles.progressText}>{(progress * 100).toFixed(2)}%</Text>
        </View>

        <Text style={styles.additionalInfo}>
          Разница до цели: {difference} $
        </Text>
        <Text style={styles.additionalInfo}>
          Оценка будущих сбережений (через год): {futureSavings} $
        </Text>

        <Button
          title="Дополнительно"
          onPress={() => navigation.navigate('CarInfo', { car, savings })}
        />
        <Button
          title="Вернуться назад"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 23,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  result: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  userSavings: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  progressText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
  additionalInfo: {
    fontFamily: 'Lobster_400Regular',
    color:'orange',
    fontSize: 20,
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
  },
});
