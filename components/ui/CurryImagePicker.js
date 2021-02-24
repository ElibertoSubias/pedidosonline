import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Image,
  StyleSheet,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'

const CurryImagePicker = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (image) {
      // console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image])

  const pickImageHandler = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        setSelectedImage(result.uri);
        onImagePicked({ uri: result.uri });
    }
  }

  const takeImageHandler = async () => {

    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        setSelectedImage(result.uri);
        onImagePicked({ uri: result.uri });
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} name="image"/>
      </View>
      <View>
        <Button styels={styles.button} title="Seleccionar fotografia" onPress={pickImageHandler} />
      </View>
      {Platform.OS !== 'web' ? 
        <View>
          <Button styels={styles.button} title="Tomar fotografia" onPress={takeImageHandler} />
        </View>
      : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: Platform.OS !== 'web' ? 200 : 200,
    height: Platform.OS !== 'web' ? 200 : 200,
    margin: 10
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
})

export default CurryImagePicker;