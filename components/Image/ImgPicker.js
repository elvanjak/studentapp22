import React,{useState} from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import {useSelector} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../../constants/Colors';

const ImgPicker = props => {
  const student = useSelector(state => state.profile.profile);
    const [imageP,setImage]=useState(student ? student.imageUrl : null);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return;
    }
    const image = await ImagePicker.launchCameraAsync({
        allowsEditing:true,
        quality:0.6
    });
     setImage(image.uri);
     props.onImageSet(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!imageP ? <Text>No image picked yet.</Text> :
        <Image style={styles.image} source={{uri:imageP}}/>}
      </View>
      <View style={{marginBottom:15}}>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 400,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
