import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingAnimation = () => {
  return (
    <View style={styles.loadingContainer}>
      <LottieView
        source={require('../animationLoad.json')} 
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00c6ff',
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default LoadingAnimation;
