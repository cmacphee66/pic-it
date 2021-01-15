/** @format */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import CameraModule from './cameraModule/CameraModule';

const App = () => {
  return (
    <View style={styles.conntainer}>
      <CameraModule></CameraModule>
      <StatusBar style='auto' />
    </View>
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
