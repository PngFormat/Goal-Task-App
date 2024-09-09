import React from 'react';
import { Image, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import imageProfile from '../image/ImageProfile.jpg';
import imageGoal from '../image/GoalProgress.jpg';
import reportImage from '../image/ReportsImage.jpg';

const data = [
  {
    id: '1',
    title: 'Создавай свой личный профиль',
    image: imageProfile,
  },
  {
    id: '2',
    title: 'Отслеживай прогресс',
    image: imageGoal,
  },
  {
    id: '3',
    title: 'Отчеты о проделанной работе',
    image: reportImage,
  }
];

export default function AboutScreen({ navigation }) {
  const renderItem = ({ item, index }) => {
    const rotateStyle = index % 2 === 0 ? styles.rotateLeft : styles.rotateRight;
    
    return (
      <View style={styles.itemContainer}>
        <Text style={[styles.titleProfile, rotateStyle]}>{item.title}</Text>
        <Image source={item.image} style={[styles.image, rotateStyle]} />
      </View>
    );
  };

  return (
    <LinearGradient 
      colors={['#4c669f', '#3b5998', '#192f6a']} 
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>О приложении</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Вернуться назад"
            onPress={() => navigation.goBack()}
            color="#000000"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  flatListContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  itemContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  titleProfile: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  rotateLeft: {
    transform: [{ rotate: '0deg' }],
  },
  rotateRight: {
    transform: [{ rotate: '0deg' }],
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
