import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';

export default function ReportsScreen({ navigation }) {
  const user = useSelector((state) => state.user);

  
  const currentMonth = new Date().getMonth(); 

const monthlySalaries = Array(currentMonth + 1).fill(user.salary || 0);
const monthlySavings = Array(currentMonth + 1).fill(0).map((_, index) => user.savings[index] || 0);

const monthlyData = {
  labels: months.slice(0, currentMonth + 1),
  datasets: [
    {
      data: monthlySalaries,
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, 
      strokeWidth: 2
    },
    {
      data: monthlySavings,
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, 
      strokeWidth: 2
    },
  ],
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Отчеты</Text>

      <Text style={styles.subtitle}>График зарплаты и сбережений по месяцам</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={monthlyData}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            propsForBackgroundLines: {
              stroke: '#eeeeee',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <Text style={styles.subtitle}>Информация о зарплате и сбережениях:</Text>
      <Text style={styles.description}>Текущая зарплата: ${user.salary?.[new Date().getMonth()] || 0}</Text>
      <Text style={styles.description}>Текущие сбережения: ${user.savings?.[new Date().getMonth()] || 0}</Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Вернуться назад</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
});
