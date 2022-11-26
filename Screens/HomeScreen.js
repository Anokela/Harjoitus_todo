import { View, Platform, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, {useState, useLayoutEffect,useEffect} from 'react'
import {AntDesign} from '@expo/vector-icons';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todo_Key';

export default function HomeScreen({route, navigation}) {
  const [todos, setTodos] = useState([]);
  /* const [todos, setTodos] = useState(
    Array(20).fill(null).map((_,i)=>(`Test ${i}`))
  ); */

  useEffect(() => {
    // AsyncStorage.clear();
    if (route.params?.todo) {
      const newKey = todos.length + 1;
      const newTodo = {key: newKey.toString(), description: route.params.todo}
      const newTodos = [...todos, newTodo];
      storeData(newTodos);
     /*  const newTodos = [...todos, route.params.todo];
      setTodos(newTodos); */
    }
    getData();
  }, [route.params?.todo])
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f0f0f0'
      },
      headerRight: () => (
        <AntDesign
          style={styles.navButton}
          name='plus'
          size={24}
          color='black'
          onPress={() => navigation.navigate('Todo')}
        />
      )
    })
  }, [])

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch(e) {
      console.log(e);
    }
  }

  const getData = async () => {
    try {
      return AsyncStorage.getItem(STORAGE_KEY)
        .then(req => JSON.parse(req))
        .then(json => {
          if(json === null) {
            json = [];
          }
          setTodos(json);
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          todos.map((todo)=>(
            <View key={todo.key} style={styles.rowContainer}>
              <Text style={styles.rowText}>{todo.description}</Text>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  }, 
  rowText: {
    fontSize: 20,
    marginLeft: 5,
  },
  navButton: {
    marginRight: 5,
    fontSize: 24,
    padding: 4,
  },
});