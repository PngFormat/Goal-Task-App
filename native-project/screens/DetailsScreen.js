import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Button } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <ImageBackground source={{ uri: 'https://www.pngall.com/wp-content/uploads/2016/05/Audi-Free-Download-PNG.png' }} style={styles.background}>
        <View style={styles.container}>
        <Text style={styles.text}></Text>
        <Text style={styles.description}>
            Приложение создано для отслеживания накопленных денег и отображения
            прогресса,сколько осталось накопить до определенной марки машины
        </Text>
        <Button
            title="Вернуться назад"
            onPress={() => navigation.goBack()}
        />
        </View>
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
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
});
