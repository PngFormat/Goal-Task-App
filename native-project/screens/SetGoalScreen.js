import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutButton from '../components/logoutButton';

export default function SetGoalScreen({ navigation }) {
  const [goalAmount, setGoalAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleSetGoal = async () => {
    if (!goalAmount || !targetDate) {
      Alert.alert('Error', 'Please enter a valid goal and target date.');
      return;
    }

    const goalData = {
      amount: parseFloat(goalAmount),
      targetDate,
    };

    try {
      await AsyncStorage.setItem('savingsGoal', JSON.stringify(goalData));
      Alert.alert('Goal Set', 'Your savings goal has been set!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Could not save the goal.');
    }
  };

  

  return (
    <View style={styles.container}>
     
     <LogoutButton navigation={navigation} />
      <Text style={styles.title}>Set a Savings Goal</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter goal amount (e.g., 5000)"
        keyboardType="numeric"
        value={goalAmount}
        onChangeText={setGoalAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter target date (e.g., December)"
        value={targetDate}
        onChangeText={setTargetDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSetGoal}>
        <Text style={styles.buttonText}>Set Goal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
