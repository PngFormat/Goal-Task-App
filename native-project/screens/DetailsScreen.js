import React, { useEffect, useReducer,useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingAnimation from '../components/loadingIndicator';

export default function DetailsScreen({ navigation }) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    },1000)

    return () => clearTimeout(timer);
  },[])

  if (loading) {
    return (
    <LoadingAnimation/>
    );
  }


  return (
    <LinearGradient
      colors={['#00c6ff', '#0072ff']}
      style={styles.gradientBackground}
    >
      <ImageBackground
        source={{ uri: 'https://www.pngall.com/wp-content/uploads/2016/05/Audi-Free-Download-PNG.png' }}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Automobile App</Text>
          <Text style={styles.description}>
            This app helps you track your savings and shows the progress towards purchasing a specific car brand.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
  },
  imageStyle: {
    opacity: 0.2,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0072ff',
  },
});
