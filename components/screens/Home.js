/** @format */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimentions,
  Pressable,
} from 'react-native';

const pressHandler = () => {};

const Home = ({ navigation }) => {
  const takePictureButton = () => {
    navigation.navigate('CameraScreen');
  };
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
      <Pressable
        title='got to camera'
        style={styles.button}
        onPress={takePictureButton}>
        <Text style={styles.text}>TAKE PICTURE</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#32CD32',
    paddingTop: 100,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 85,
    backgroundColor: 'white',
    width: '80%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
