/** @format */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

// import * as mobilenet from '@tensorflow-models/mobilenet'
// see https://github.com/tensorflow/tfjs-models
import * as cocossd from '@tensorflow-models/coco-ssd';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as jpeg from 'jpeg-js';
import * as ImagePicker from 'expo-image-picker';

import { fetch } from '@tensorflow/tfjs-react-native';

export default class DetectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
      isModelReady: false,
      predictions: null,
      image: null,
    };
  }

  async componentDidMount() {
    await tf.ready(); // preparing TensorFlow
    this.setState({ isTfReady: true });

    // this.model = await mobilenet.load(); // preparing MobileNet model
    this.model = await cocossd.load(); // preparing COCO-SSD model
    this.setState({ isModelReady: true });

    this.getPermissionAsync(); // get permission for accessing camera on mobile device
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Please grant camera roll permission for this project!');
      }
    }
  };

  imageToTensor(rawImageData) {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
  }

  detectObjects = async () => {
    try {
      const imageAssetPath = Image.resolveAssetSource(this.state.image);

      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const rawImageData = await response.arrayBuffer();
      const imageTensor = this.imageToTensor(rawImageData);
      const predictions = await this.model.detect(imageTensor);

      this.setState({ predictions: predictions });
      // this.setState({ image_uri: imageAssetPath.uri })

      console.log('----------- predictions: ', predictions);
    } catch (error) {
      console.log('Exception Error: ', error);
    }
  };

  selectImage = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!response.cancelled) {
        const source = { uri: response.uri };
        this.setState({ image: source });
        this.detectObjects();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
  [{
  bbox: [x, y, width, height],
  class: "person",
  score: 0.8380282521247864
  }, {
  bbox: [x, y, width, height],
  class: "kite",
  score: 0.74644153267145157
  }]
  */
  renderPrediction = (prediction, index) => {
    const pclass = prediction.class;
    const score = Math.round(prediction.score);
    // const x = prediction.bbox[0];
    // const y = prediction.bbox[1];
    // const w = prediction.bbox[2];
    // const h = prediction.bbox[3];

    return (
      <View style={styles.welcomeContainer}>
        <Text key={index} style={styles.text}>
          {/* Prediction:  */}
          {pclass}
          {/* Probability:  */}
          {score} {', '}
          {/* Bbox: {x}{' '}
          {', '} {y} {', '} {w} {', '} {h} */}
        </Text>
      </View>
    );
  };

  render() {
    const { isTfReady, isModelReady, predictions, image } = this.state;

    return (
      <ImageBackground
        source={require('../assets/gradient.jpg')}
        style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <StatusBar barStyle='dark-content' backgroundColor='#171f24' />
            <View style={styles.loadingContainer}>
              <Text style={styles.text}>
                {/* TensorFlow.js ready?  */}
                {isTfReady ? <Text></Text> : ''}
              </Text>
              <View style={styles.loadingModelContainer}>
                <Text style={styles.text}>Detect </Text>
                {isModelReady ? (
                  <Text style={styles.text}>🚀</Text>
                ) : (
                  <ActivityIndicator size='small' />
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.imageWrapper}
              onPress={isModelReady ? this.selectImage : undefined}>
              {image && <Image source={image} style={styles.imageContainer} />}

              {isModelReady && !image && (
                <Text style={styles.transparentText}>Tap to choose image</Text>
              )}
            </TouchableOpacity>
            <View style={styles.predictionWrapper}>
              {isModelReady && image && (
                <Text style={styles.text}>
                  {/* Predictions: */}
                  {predictions ? '' : 'Detecting...'}
                </Text>
              )}

              {isModelReady &&
                predictions &&
                predictions.map((p, index) => this.renderPrediction(p, index))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

// CocoSsdScreen.navigationOptions = {
//   header: null,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(47, 163, 218, 0.4)',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  contentContainer: {
    paddingTop: 30,
  },
  loadingContainer: {
    marginTop: -20,
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  loadingModelContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageWrapper: {
    width: 280,
    height: 280,
    padding: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'dashed',
    marginTop: 40,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
  predictionWrapper: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  transparentText: {
    color: '#ffffff',
    opacity: 0.7,
  },
  footer: {
    marginTop: 40,
  },
});
