import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

import { Button, Divider } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

export default function ImagePickerComp(props) {
  // The path of the picked image

  const resizeImage = async (result, resize = 0.05) => {
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
      const image = await resizeImage(result, props.resize);
      if (props.context == "Profile") {
        props.updateResult(image);
      }
      if (props.context == "ItemImage" || "CommunityImage") {
        props.updateResult(image);
      }
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

    props.hideTakePicture();
    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      const image = await resizeImage(result, props.resize);
      if (props.context == "Profile") {
        props.updateResult(image);
      }
      if (props.context == "ItemImage" || "CommunityImage") {
        props.updateResult(image);
      }
    } else {
      return;
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Button onPress={showImagePicker} appearance="ghost">
        Välj bild från album
      </Button>
      <Divider />
      <Button onPress={openCamera} appearance="ghost">
        Öppna kamera
      </Button>
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
    width: 200,
    flexDirection: "column",
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
