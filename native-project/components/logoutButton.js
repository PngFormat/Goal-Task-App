import React from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LogoutButton({ navigation }) {
  const handleLogout = () => {
    try {
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Error while logging out.');
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Icon name="log-out-outline" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
});
