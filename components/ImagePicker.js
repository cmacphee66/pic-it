/** @format */

import React, { useState } from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={StyleSheet.conatiner}>
      <Button
        style={styles.button}
        title='Choose image from camera roll'
        onPress={() => {
          pickImage();
        }}
      />
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 85,
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: 400,
    height: 400,
  },
});

export default ImagePickerComponent;
