import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingAnimation from '../components/loadingIndicator';


export default function ReportsScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const currentMonth = new Date().getMonth(); 

  const fetchUserData = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <LoadingAnimation/>
    );
  }


  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user data found.</Text>
      </View>
    );
  }

  const monthlySalaries = Array(currentMonth + 1).fill(user.salary || 0);
  const monthlySavings = Array(currentMonth + 1).fill(0).map((_, index) => user.savings?.[index] || 0);

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
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
      <Text style={styles.description}>Текущая зарплата: ${user.salary || 0}</Text>
      <Text style={styles.description}>Текущие сбережения: ${user.savings?.[currentMonth] || 0}</Text>

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
    backgroundColor: '#f6f7fb',
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});
