import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Layout,
  Button,
  Input,
  Icon,
  useTheme,
  Modal,
  Card,
} from "@ui-kitten/components";
import tw from "twrnc";
import ImagePickerComp from "../Components/ImagePickerComponent";
import { UserInfo, GoogleInfo } from "../assets/AppContext";
import {
  editProfile,
  pushImagesToServer,
} from "../Services/ServerCommunication";

export const ChangeAccountInfoScreen = ({ navigation }) => {
  // CONTEXT
  const { googleInfo, setGoogleInfo } = React.useContext(GoogleInfo);
  const { userInfo, setUserInfo } = React.useContext(UserInfo);

  // STATE
  const [phoneNumber, setPhoneNumber] = React.useState(userInfo.number);
  const [adress, setAdress] = React.useState(userInfo.adress);
  const [firstName, setFirstName] = React.useState(userInfo.firstname);
  const [lastName, setLastName] = React.useState(userInfo.lastname);
  const [profileImage, setProfileImage] = React.useState({
    uri: userInfo.imgurl,
  });
  const [visible, setVisible] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const [updatedProfile, setUpdatedProfile] = React.useState();

  const theme = useTheme();

  const AddIcon = () => (
    <Icon style={styles.lockStyle} fill="#8F9BB3" name="plus-circle-outline" />
  );
  const StarIcon = (url) => (
    <Image
      style={tw`rounded-full`}
      source={{
        uri: url,
        height: 40,
        width: 40,
      }}
    />
  );

  const ChoseImageModal = () => {
    return (
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setVisible(false);
        }}
      >
        <Card disabled={true}>
          <ImagePickerComp
            context="ItemImage"
            updateResult={(result) => {
              setProfileImage(result);
              setUpdated(true);
            }}
            hideTakePicture={() => {
              setVisible(false);
            }}
          />
        </Card>
      </Modal>
    );
  };

  async function updateProfile() {
    if (profileImage.uri !== userInfo.imgurl) {
      let bucketImage = await pushImagesToServer(
        profileImage,
        "Profile",
        userInfo.id
      );
      setUpdatedProfile({ ...updatedProfile, imgurl: bucketImage });
      setProfileImage({ uri: bucketImage });
      updatedProfile.imgurl = bucketImage;
    }

    await editProfile(updatedProfile, userInfo.id);
  }

  return (
    <Layout style={styles.container}>
      <Layout style={styles.createUserContainer} level="1">
        <Image
          style={tw`rounded-full`}
          source={{ uri: profileImage.uri, height: 150, width: 150 }}
        />
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          style={styles.AddIconContainer}
        >
          <ChoseImageModal />
          <AddIcon />
        </TouchableOpacity>

        <Input
          label="Förnamn"
          value={firstName}
          style={styles.input}
          onChangeText={(nextValue) => {
            setFirstName(nextValue);
            setUpdated(true);
            setUpdatedProfile({
              ...updatedProfile,
              firstname: nextValue,
            });
          }}
        />
        <Input
          label="Efternamn"
          value={lastName}
          style={styles.input}
          onChangeText={(nextValue) => {
            setLastName(nextValue);
            setUpdated(true);
            setUpdatedProfile({
              ...updatedProfile,
              lastname: nextValue,
            });
          }}
        />
        <Input
          label="Telefonnummer"
          value={phoneNumber}
          style={styles.input}
          onChangeText={(nextValue) => {
            setPhoneNumber(nextValue);
            setUpdated(true);
            setUpdatedProfile({
              ...updatedProfile,
              number: nextValue,
            });
          }}
        />
        <Input
          label="Adress"
          value={adress}
          style={styles.input}
          onChangeText={(nextValue) => {
            setAdress(nextValue);
            setUpdated(true);
            setUpdatedProfile({
              ...updatedProfile,
              adress: nextValue,
            });
          }}
        />

        <Button
          id="createProfile"
          onPress={() => {
            updateProfile();
            navigation.navigate("ProfileScreen");
          }}
          disabled={!updated}
          style={{
            marginTop: 30,
            backgroundColor: updated
              ? theme["color-primary-500"]
              : theme["color-primary-300"],
          }}
        >
          Ändra Konto
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingTop: 30,
    paddingLeft: 7,
    paddingRight: 7,
  },
  createUserContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  lockStyle: {
    width: 50,
    height: 50,
  },
  AddIconContainer: {
    position: "absolute",
    marginTop: 110,
    backgroundColor: "white",
    borderRadius: 50,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    marginBottom: 8,
    width: 350,
  },
});
