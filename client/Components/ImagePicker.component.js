import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
export default function ImagePickerComp() {
  // The path of the picked image

  const [pickedImagePath, setPickedImagePath] = useState("");

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    console.log("här");
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0,
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      pushToServer(result);
    }
    console.log(result.uri);
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);
    if (!result.cancelled) {
      pushToServer(result);
    }
  };

  const pushToServer = async (result) => {
   // setPickedImagePath(result.uri);
   const image = await resizeImage(result);
    const body = new FormData();
    body.append("image", {
      name: "photo.jpg",
      type: image.type,
      uri: image.uri,
    });
    var ip = "http://ec2-3-215-18-23.compute-1.amazonaws.com/images";

    fetch(ip, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch((err) => console.log(err));
  };


  resizeImage = async (result) => {
    const manipResult = await ImageManipulator.manipulateAsync(
     
      result.uri,
      [{ resize: { width: result.width * 0.04, height: result.height * 0.04 } }],
      { compress: 1}
    ); 
    setPickedImagePath(manipResult.uri);
      return manipResult;
    }









  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />
      </View>

      <View style={styles.imageContainer}>
        {pickedImagePath !== "" && (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        )}
      </View>
    </View>
  );
    


        }

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },
});
