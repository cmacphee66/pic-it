/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const cam = useRef();

  const takePicture = async () => {
    if (cam.current) {
      const options = {
        quality: 0.5,
        base64: true,
        skipProcessing: true,
      };
      let photo = await cam.current.takePictureAsync(options);
      console.log(cam.current.getAvailablePictureSizesAsync());
      const source = photo.uri;

      if (source) {
        cam.current.resumePreview();
        handleSave(source);
        console.log('picture source', source);
      }
    }
  };

  const handleSave = async (photo) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); //MEDIA_LIBRARY
    if (status === 'granted') {
      const proceed = await MediaLibrary.createAssetAsync(photo);
      MediaLibrary.createAlbumAsync('Pick-it-App Photos', proceed);
    } else {
      console.warn('Permission Needed');
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera ref={cam} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => {
              takePicture();
            }}>
            <Text style={styles.text}> Take </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    margin: 20,
    top: '70%',
  },
  flipButton: {
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
  },
  captureButton: {
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    justifyContent: 'center',
  },
});

export default CameraScreen;
