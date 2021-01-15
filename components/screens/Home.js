/** @format */

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimentions } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.button}>
        <Text style={styles.text}>TAKE PICTURE</Text>
      </View>
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
