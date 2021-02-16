/** @format */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  StatusBar,
} from 'react-native';

const pressHandler = () => {};

const Home = ({ navigation }) => {
  const takePictureButton = () => {
    navigation.navigate('CameraScreen');
  };

  const chooseImageButton = () => {
    navigation.navigate('ImagePicker');
  };

  const detectImageButton = () => {
    navigation.navigate('DetectionScreen');
  };
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.container}
    >
      <View style={styles.overlayContainer}>
        <View style={styles.top}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View style={styles.bottom}>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.takePictureButton}
              title='go to camera'
              onPress={takePictureButton}
            >
              <Text style={styles.text}>TAKE PICTURE</Text>
            </Pressable>
            <StatusBar barStyle='light-content' />
            <Pressable
              style={styles.chooseImageButton}
              title='Choose Image'
              onPress={chooseImageButton}
            >
              <Text style={styles.text}>CHOOSE IMAGE</Text>
            </Pressable>
            <Pressable
              style={styles.detectImageButton}
              title='Detect Image'
              onPress={detectImageButton}
            >
              <Text style={styles.text}>DETECT IMAGE</Text>
            </Pressable>
          </View>
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
    width: 140,
    height: 140,
    top: 40,
    resizeMode: 'contain',
  },
  bottom: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takePictureButton: {
    position: 'absolute',
    bottom: -40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  chooseImageButton: {
    position: 'absolute',
    bottom: -120,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  detectImageButton: {
    position: 'absolute',
    bottom: -200,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: -70,
    flexDirection: 'column',
  },
});

export default Home;
