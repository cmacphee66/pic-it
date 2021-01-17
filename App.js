/** @format */
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from './components/screens/CameraScreen';
import Home from './components/screens/Home';
import ImageScreen from './components/screens/ImageScreen';
import ImagePicker from './components/ImagePicker';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CameraScreen'
          component={CameraScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name='ImagePicker' component={ImagePicker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
});

export default App;
