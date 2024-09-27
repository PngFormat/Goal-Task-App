import React from 'react';
import { remove_goal } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { ImageBackground, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import LogoutButton from '../components/logoutButton';

export default function OutputTask({ route, navigation }) {
  const goals = useSelector((state) => state.goals.goals);
  const dispatch = useDispatch();

  return (
    <ImageBackground 
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4IHBGQwRqf4xCHQwv9iokF4IRww7e-Kft7g&s' }} 
      style={styles.background}
    >
      <LogoutButton navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Задачи</Text>
        </View>
        <ScrollView>
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <View key={index} style={styles.goalContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.textGoal}>{goal.id}.</Text>
                  <Text style={styles.textGoal}>Цель: {goal.goal}</Text>
                  <Text style={styles.textInfo}>Описание: {goal.textInfo}</Text>
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={() => dispatch(remove_goal(index))}>
                  <Text style={styles.removeButtonText}>Удалить</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.noGoalsContainer}>
              <ImageBackground
                source={{ uri: 'https://miro.medium.com/v2/resize:fit:300/1*rNcg3eu0Ifu6sVU_ohhwXw.jpeg' }}
                style={styles.fullscreenImage}
              >
                <Text style={styles.noGoalsText}>Задачи отсутствуют</Text>
              </ImageBackground>
             
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginBottom: 20,
  },
  noGoalsText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  noGoalsContainer: {
    flex:1,
    justifyContent: 'center',
    alignContent: 'center',
    height: 200,
  
    alignItems: 'center',
    height: '100%',
  },
  fullscreenImage: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  textGoal: {
    fontWeight: '600',
    fontSize: 18,
    color: '#333',
  },
  textInfo: {
    fontWeight: '400',
    fontSize: 16,
    color: '#666',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    maxWidth: '80%',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
