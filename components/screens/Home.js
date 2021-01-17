/** @format */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';

const pressHandler = () => {};

const Home = ({ navigation }) => {
  const takePictureButton = () => {
    navigation.navigate('CameraScreen');
  };

  const chooseImageButton = () => {
    navigation.navigate('ImagePicker');
  };
  return (
    <ImageBackground
      source={require('../../assets/home-image.jpg')}
      style={styles.container}>
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View style={styles.bottom}>
          <Pressable
            style={styles.takePictureButton}
            title='go to camera'
            onPress={takePictureButton}>
            <Text style={styles.text}>TAKE PICTURE</Text>
          </Pressable>
          <Pressable
            style={styles.chooseImageButton}
            title='Choose Image'
            onPress={chooseImageButton}>
            <Text style={styles.text}>CHOOSE IMAGE</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(47, 163, 218, 0.4)',
  },
  top: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  bottom: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takePictureButton: {
    position: 'absolute',
    bottom: 85,
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  chooseImageButton: {
    position: 'absolute',
    bottom: 15,
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(47, 163, 218, 1)',
  },
});

export default Home;
