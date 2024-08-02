import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ReportsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Отчеты</Text>
      <Text style={styles.subtitle}>Здесь можно добавить информацию и графики по вашим отчетам.</Text>
      <Text style={styles.description}>
        Например, вы можете показать статистику по использованию приложения, данные пользователей и т.д.
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
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
