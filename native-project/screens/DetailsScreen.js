import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DetailsScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.gradientBackground}
    >
      <ImageBackground
        source={{ uri: 'https://www.pngall.com/wp-content/uploads/2016/05/Audi-Free-Download-PNG.png' }}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Приложение для авто</Text>
          <Text style={styles.description}>
            Это приложение помогает отслеживать накопленные деньги
            и показывает прогресс до покупки определенной марки машины.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Вернуться назад"
              onPress={() => navigation.goBack()}
              color="#f194ff"
            />
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    opacity: 0.1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  buttonContainer: {
    marginTop: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
