/** @format */

/** @format */

import React, { useState } from 'react';
import { Button, View, Image, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.conatiner}>
      <Pressable
        style={styles.button}
        title='Choose image'
        onPress={() => {
          pickImage();
        }}>
        <AntDesign name='pluscircleo' size={100} color='white' />
      </Pressable>
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
    backgroundColor: 'rgba(47, 163, 218, 0.4)',
  },
  button: {
    position: 'absolute',
    bottom: 40,
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
