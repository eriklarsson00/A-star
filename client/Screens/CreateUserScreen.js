import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Text,
  Layout,
  Button,
  Input,
  Icon,
  useTheme,
  Modal,
  Card,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import tw from "twrnc";
import ImagePicker from "../Components/ImagePicker";
import {
  ProfileImagePath,
  CommunityInfo,
  UserInfo,
  UserLoggedIn,
  GoogleInfo,
} from "../assets/AppContext";
import { addProfile } from "../Services/ServerCommunication";

export const CreateUserScreen = () => {
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const { googleInfo, setGoogleInfo } = React.useContext(GoogleInfo);
  const { userLoggedIn, setLoggedIn } = React.useContext(UserLoggedIn);
  const [firstName, setFirstName] = React.useState(
    googleInfo?.given_name ?? ""
  );
  const [lastName, setLastName] = React.useState(googleInfo?.family_name ?? "");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const { profileImagePath, setProfileImagePath } =
    React.useContext(ProfileImagePath);
  const { community, setCommunity } = React.useContext(CommunityInfo);

  const [selectedIndex, setSelectedIndex] = React.useState([
    new IndexPath(0),
    new IndexPath(1),
  ]);
  const [visible, setVisible] = React.useState(false);

  async function createProfile() {
    let accountData = {
      firstname: firstName,
      lastname: lastName,
      number: phoneNumber,
      email: googleInfo?.email ?? null,
      location: "",
      imgurl: "", //TODO fixa bucket-bild
      rating: 0,
      adress: adress,
      raters: 0,
      given: 0,
      taken: 0,
    };
    let updatedProfile = await addProfile(accountData);
    setUserInfo(updatedProfile);
    setLoggedIn(true);
  }

  const theme = useTheme();
  const dataBaseCommunities = [
    {
      id: 0,
      memberAmount: 104,
      name: "Rackarberget",
      description: "beskrivning",
      location: "plats",
      imgurl:
        "https://www.uppsalahem.se/globalassets/bilder/omradesbilder/7002/Rackarberget_3.jpg?w=320",
      private: false,
      password: "psw",
    },
    {
      id: 2,
      memberAmount: 50,
      name: "Ultuna",
      description: "beskrivning",
      location: "plats",
      imgurl:
        "https://image.shutterstock.com/image-vector/vector-illustration-cool-detailed-red-260nw-94498447.jpg",
      private: false,
      password: "psw",
    },
    {
      id: 3,
      memberAmount: 60,
      name: "Djäknegatan",
      description: "beskrivning",
      location: "plats",
      imgurl:
        "https://image.shutterstock.com/image-vector/vector-illustration-cool-detailed-red-260nw-94498447.jpg",
      private: false,
      password: "psw",
    },
    {
      id: 4,
      memberAmount: 62,
      name: "Innerstan",
      description: "beskrivning",
      location: "plats",
      imgurl:
        "https://image.shutterstock.com/image-vector/vector-illustration-cool-detailed-red-260nw-94498447.jpg",
      private: false,
      password: "psw",
    },
    {
      id: 6,
      memberAmount: 24,
      name: "Kantorn",
      description: "beskrivning",
      location: "plats",
      imgurl:
        "https://image.shutterstock.com/image-vector/vector-illustration-cool-detailed-red-260nw-94498447.jpg",
      private: false,
      password: "psw",
    },
    {
      id: 6,
      memberAmount: 13,
      name: "Rosendal",
      description: "beskrivning",
      location: "plats",
      imgurl:
        "https://image.shutterstock.com/image-vector/vector-illustration-cool-detailed-red-260nw-94498447.jpg",
      private: false,
      password: "psw",
    },
  ];

  const AddIcon = () => (
    <Icon style={styles.lockStyle} fill="#8F9BB3" name="plus-circle-outline" />
  );

  const ChoseImageModal = () => {
    return (
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <ImagePicker context="Profile" />
          <Button style={tw`mt-2 w-50`} onPress={() => setVisible(false)}>
            Klar
          </Button>
        </Card>
      </Modal>
    );
  };

  const SelectCommunity = () => {
    return (
      <Layout style={{ height: 128, width: "100%" }} level="1">
        <Select
          multiSelect={true}
          label="Välj grannskap"
          placeholder="Välj grannskap"
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {dataBaseCommunities.map(() => {
            return <SelectItem key="majklockan" title={"hej"} />;
          })}
        </Select>
      </Layout>
    );
  };

  return (
    <Layout style={styles.container}>
      <Layout style={tw`pt-5 pb-2`}>
        <Text style={tw`text-lg text-center`}>Slutför registrering</Text>
      </Layout>
      <Layout style={styles.createUserContainer} level="1">
        <Image
          style={tw`rounded-full`}
          source={{ uri: profileImagePath, height: 150, width: 150 }}
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
          onChangeText={(nextValue) => setFirstName(nextValue)}
        />
        <Input
          label="Efternamn"
          value={lastName}
          onChangeText={(nextValue) => setLastName(nextValue)}
        />
        <Input
          label="Telefonnummer"
          value={phoneNumber}
          onChangeText={(nextValue) => setPhoneNumber(nextValue)}
        />
        <Input
          label="Adress"
          value={adress}
          onChangeText={(nextValue) => setAdress(nextValue)}
        />
        <SelectCommunity />
        <Button
          id="createProfile"
          onPress={createProfile}
          disabled={
            firstName === "" ||
            lastName === "" ||
            phoneNumber === "" ||
            adress === ""
          }
          style={{
            backgroundColor:
              firstName === "" ||
              lastName === "" ||
              phoneNumber === "" ||
              adress === ""
                ? "grey"
                : theme["color-primary-500"],
          }}
        >
          Skapa Konto
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  createUserContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  lockStyle: {
    width: 65,
    height: 65,
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
});
