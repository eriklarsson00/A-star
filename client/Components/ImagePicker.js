import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import {
  ProfileImagePath,
  UserInfo,
  ItemImagePath,
} from "../assets/AppContext";
import { pushToServer } from "../Services/ServerCommunication";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerComp(props) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState(null);
  const { profileImagePath, setProfileImagePath } =
    React.useContext(ProfileImagePath);
  const { itemImagePath, setItemImagePath } = React.useContext(ItemImagePath);
  const { userInfo, setUserInfo } = React.useContext(UserInfo);

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0,
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      if (props.context == "Profile") {
        setProfileImagePath(result.uri);
      }
      if (props.context == "ItemImage") {
        setItemImagePath(result.url);
      }
      pushToServer(result);
    }
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

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      if (props.context == "Profile") {
        setProfileImagePath(result.uri);
      }
      if (props.context == "ItemImage") {
        console.log("hej");
        console.log("result.url: " + result.uri);
        setItemImagePath(result.uri);
        console.log("item" + itemImagePath);
      }
      props.updateResult(result);
    }
  };

  const pushToServer = async (result) => {
    const image = await resizeImage(result, props.resize);
    const body = new FormData();
    body.append("image", {
      name: "photo.jpg",
      type: image.type,
      uri: image.uri,
    });

    var url =
      "http://ec2-3-215-18-23.compute-1.amazonaws.com/users/profile/" +
      userInfo.id;

    fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((data) => data.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  resizeImage = async (result, resize = 0.05) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [
        {
          resize: {
            width: result.width * resize,
            height: result.height * resize,
          },
        },
      ],
      { compress: 1 }
    );
    return manipResult;
  };

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
