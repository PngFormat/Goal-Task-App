import React, { useState } from 'react';
import {Text, View, Button, Image, StyleSheet, Alert, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({setSelectedImage}) {

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setSelectedImage(pickerResult.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    if (!pickerResult.cancelled) {
      setSelectedImage(pickerResult.uri);
    }
    console.log(pickerResult.uri)
  };

  return (
    <View style={styles.btnImage}>
    <Button title="Выбрать изображение" onPress={pickImage} color='gray' />
      <Button title="Сделать фото" onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
 
  btnImage:{
    marginTop:35,
    marginHorizontal:50,
  },

});
