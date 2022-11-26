import { View, Text, TextInput, Platform, StyleSheet,SafeAreaView } from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {AntDesign} from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function DetailsScreen({navigation}) {
  const [todo, setTodo] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f0f0f0'
      },
      headerRight: () => (
        <AntDesign
          style={styles.navButton}
          name='save'
          size={24}
          color='black'
          onPress={()=> navigation.navigate('Home',{todo: todo})}
          />
      )
    })
  
  }, [todo])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Add new item: </Text>
        <TextInput style={styles.newTask} placeholder='Add new Task' value={todo} onChangeText={(value)=>setTodo(value)}></TextInput>
      </View>
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
  navButton: {
    marginRight: 5,
    fontSize: 24,
    padding: 4,
  },
  newTask: {
    width: '100%',
    margin: 20,
    fontSize: 18,
  },
});