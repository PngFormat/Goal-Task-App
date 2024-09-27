import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutButton from '../components/logoutButton';

export default function EditProfileScreen({ route, navigation }) {
  const { user, onUpdate } = route.params;

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [salary, setSalary] = useState(user.salary ? user.salary.toString() : '');

  const currentMonth = new Date().getMonth();
  const [monthlySavings, setMonthlySavings] = useState(
    Array(currentMonth + 1).fill('').map((_, index) => {
      return user.savings && user.savings[index] !== undefined ? user.savings[index].toString() : '';
    })
  );

  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const handleSave = async () => {
    const updatedUser = { 
      ...user, 
      name,
      email, 
      salary: Number(salary), 
      savings: monthlySavings.map(Number) 
    };

    try {
      onUpdate(updatedUser);
      await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));
      Alert.alert('Профиль обновлен');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Ошибка при сохранении данных');
    }
  };

  const handleSavingsChange = (value, index) => {
    const updatedSavings = [...monthlySavings];
    updatedSavings[index] = value;
    setMonthlySavings(updatedSavings);
  };

  return (
    <View style={styles.container}>

      <LogoutButton navigation={navigation}/>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Имя</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Введите имя"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Почта</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Введите почту"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Месячная зарплата</Text>
        <TextInput
          style={styles.input}
          value={salary}
          onChangeText={setSalary}
          placeholder="Введите зарплату"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />

        {months.slice(0, currentMonth + 1).map((month, index) => (
          <View key={index}>
            <Text style={styles.label}>{month} Сбережения</Text>
            <TextInput
              style={styles.input}
              value={monthlySavings[index]}
              onChangeText={(value) => handleSavingsChange(value, index)}
              placeholder="Введите сбережения"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
 
});
