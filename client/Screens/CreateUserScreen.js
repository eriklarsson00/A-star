import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
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
} from "../assets/AppContext";

export const CreateUserScreen = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const [location, setLocation] = React.useState("");
  const { profileImagePath, setProfileImagePath } =
    React.useContext(ProfileImagePath);
  const { community, setCommunity } = React.useContext(CommunityInfo);

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [visible, setVisible] = React.useState(false);

  const createProfile = () => {
    let accountData = {
      firstName: firstName,
      lastName: lastName,
      number: phoneNumber,
      email: userInfo.email,
      location: location,
      imgurl: "", //TODO fixa bucket-bild
      rating: "", //TODO : Start rating?
      given: 0,
      taken: 0,
    };
    setUserInfo(accountData);
    //TO DO pusha upp på databasen
    //navigera till start
  };

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
          <ImagePicker resize={1} context="Profile" />
          <Button style={tw`mt-2 w-50 `} onPress={() => setVisible(false)}>
            Klar
          </Button>
        </Card>
      </Modal>
    );
  };

  const SelectCommunity = () => {
    return (
      <Layout style={{ minHeight: 128 }} level="1">
        <Select
          multiSelect={true}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {dataBaseCommunities.map(() => {
            return <SelectItem title={"hej"} />;
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
      <Layout style={styles.createUserContainer}>
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
          value={location}
          onChangeText={(nextValue) => setLocation(nextValue)}
        />
        <Text></Text>
        <SelectCommunity />
        <Button
          disabled={
            firstName === "" ||
            lastName === "" ||
            phoneNumber === "" ||
            location === ""
          }
          onPress={() => createProfile()}
          style={{ width: 200, margin: 15 }}
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
