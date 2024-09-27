import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingAnimation from '../components/loadingIndicator';
import SetGoalScreen from './SetGoalScreen';


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

      <TouchableOpacity
        onPress={() => navigation.navigate('SetGoals')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Установить цели</Text>
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
    backgroundColor: '#c5dced', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFF', 
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '400',
  },
  chart: {
    borderRadius: 16,
  },
});
