import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AboutScreen from './screens/AboutApp';
import Rep from './screens/Reports';
import CarsScreen from './screens/CarsScreen';
import PersonalProfile from './screens/PersonalProfileScreen'
import { StyleSheet, Text, View, Button } from 'react-native';
import FullInfoScreen from './screens/FullInfoScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AboutCar from './screens/AboutCar';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TaskScreen from './screens/TaskScreen';
import OutputTask from './screens/OutputTasks';
import Feedback from './screens/FeedBackScreen'
import { Provider } from 'react-redux';
import store from './redux/store';
import SetGoalScreen from './screens/SetGoalScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" alignItems screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Report" component={Rep} />
        <Stack.Screen name="Cars" component={CarsScreen} />
        <Stack.Screen name="CarDetails" component={FullInfoScreen} />
        <Stack.Screen name="Profile" component={PersonalProfile} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="CarInfo" component={AboutCar} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Task" component={TaskScreen} />
        <Stack.Screen name="OutputTask" component={OutputTask} />
        <Stack.Screen name="Contact" component={Feedback} />
        <Stack.Screen name="SetGoals" component={SetGoalScreen} />
    
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSection: {
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
