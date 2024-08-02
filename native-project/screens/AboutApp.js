import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>О приложении</Text>
      <Text style={styles.description}>
        Это приложение разработано для демонстрации базовых возможностей React Native и Expo.
      </Text>
      <Button
        title="Вернуться назад"
        onPress={() => navigation.goBack()}
      />
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
