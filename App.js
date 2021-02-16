/** @format */
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from './screens/CameraScreen';
import Home from './screens/Home';
import DetectionScreen from './screens/DetectionScreen';
// import DetectionScreen from './yuuup';
import ImagePickerComponent from './components/ImagePickerComponent';

LogBox.ignoreAllLogs(true);

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
          // options={{ headerShown: false }}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            },
          }}
        />
        <Stack.Screen
          name='ImagePicker'
          component={ImagePickerComponent}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name='DetectionScreen'
          component={DetectionScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {},
});

export default App;
