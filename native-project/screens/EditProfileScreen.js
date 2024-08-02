import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen({ route, navigation }) {
  const { user, onUpdate } = route.params;
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [salary, setSalary] = useState(user.salary ? user.salary.toString() : '');
  const [savings, setSavings] = useState(user.savings ? user.savings.toString() : '');

  const handleSave = async () => {
    const updatedUser = { ...user, username: name, email, salary: Number(salary), savings: Number(savings) };
    try {
      onUpdate(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      Alert.alert('Профиль обновлен');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Ошибка при сохранении данных');
    }
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.label}>Месячные сбережения:</Text>
      <TextInput
        style={styles.input}
        value={savings}
        onChangeText={setSavings}
        keyboardType="numeric"
      />
      <Button
        title="Сохранить"
        onPress={handleSave}
      />
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
});
