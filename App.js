import HomeScreen from './Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DetailsScreen from './Screens/DetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitle: 'Home'
          }}
          />
          <Stack.Screen
          name='Todo'
          component={DetailsScreen}
          options={{
            title: 'Todo',
            headerTitle: 'Todo'
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

