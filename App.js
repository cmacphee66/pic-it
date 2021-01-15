/** @format */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

// import CameraScreen from './components/CameraScreen';
import Home from './components/screens/Home';

const App = () => {
  return (
    <View style={styles.conntainer}>
      <Home></Home>
      {/* <CameraScreen></CameraScreen> */}
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
