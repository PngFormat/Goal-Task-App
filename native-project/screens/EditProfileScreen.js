import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      onUpdate(updatedUser);  // Обновляем данные в Redux
      await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUser));  // Сохраняем обновленные данные в AsyncStorage
      Alert.alert('Профиль обновлен');
      navigation.goBack();  // Возвращаемся к предыдущему экрану
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Имя:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Почта:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Месячная зарплата:</Text>
        <TextInput
          style={styles.input}
          value={salary}
          onChangeText={setSalary}
          keyboardType="numeric"
        />

        {months.slice(0, currentMonth + 1).map((month, index) => (
          <View key={index}>
            <Text style={styles.label}>{month} Сбережения:</Text>
            <TextInput
              style={styles.input}
              value={monthlySavings[index]}
              onChangeText={(value) => handleSavingsChange(value, index)}
              keyboardType="numeric"
            />
          </View>
        ))}

        <Button
          title="Сохранить"
          onPress={handleSave}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
