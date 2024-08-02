import React, { useEffect, useState } from 'react';
import { remove_goal } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux';
import {ImageBackground, StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';


export default function OutputTask({ route, navigation }) {
    const goals = useSelector((state) => state.goals.goals);
    const dispatch = useDispatch()
    console.log("Goals data:", goals); 

  
    return (
      <ImageBackground source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4IHBGQwRqf4xCHQwv9iokF4IRww7e-Kft7g&s'}} style={styles.background}>

      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Задачи</Text>
    
        </View>
        <ScrollView>
        {goals.length > 0 ? (
          goals.map((goal, index) => (
            <View key={index} style={styles.goalContainer}>
             <View style={styles.textContainer}>
             <Text style={styles.textGoal}> {goal.id}.</Text>
              <Text style={styles.textGoal}>Цель: {goal.goal}</Text>
              <Text style={styles.textInfo}>Описание: {goal.textInfo}</Text>
              </View>
              <TouchableOpacity style={styles.removeButton} >
                <Button title="Remove Goal" onPress={() => dispatch(remove_goal(index)) } color='red' />
              </TouchableOpacity>
            </View>
            
          ))
        ) : (
          <View style={styles.noGoalsContainer}>
            <View style={styles.imageContainer}>
            <ImageBackground source={{uri:'https://miro.medium.com/v2/resize:fit:300/1*rNcg3eu0Ifu6sVU_ohhwXw.jpeg'}} 
            style={styles.background2}>

              <Text style={styles.noGoalsText}>No Goals Available</Text>
             
            </ImageBackground>
            </View>
          </View>
        )} 
        </ScrollView>
      </View>
      </ImageBackground>
    );
  }

const styles = StyleSheet.create({
    titleView:{
      alignItems:'center'
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      overflow: 'hidden', 
    },
    noGoalsText:{
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', 
      padding: 10,
    },
    noGoalsContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    background2: {
      width: '100%',
      height:'75%',
      justifyContent:'center',
      alignItems: 'center',
      borderRadius:5,

    
    },
    container: {
      flexGrow: 1,
      padding: 20,
    },
    textGoal:{
      fontWeight: '500',
      fontSize:20,
      fontFamily: 'serif',
      flexShrink: 1,
    },
    textInfo:{
      fontWeight: '300',
      fontSize:17,
      fontFamily: 'serif',
      flexShrink: 1
    },
    textContainer: {
      flex: 1, 
      marginRight: 10, 
      maxWidth: '80%', 
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 30,
      alignItems:'center',
    },
    goalContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: 20,
      padding: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 5,
      flexWrap: 'wrap'
    
    },
    label: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    image: {
      width: 100,
      height: 100,
      marginTop: 10,
    }
  });