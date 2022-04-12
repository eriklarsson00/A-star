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
  ShowCommunityIds,
  MyCommunitysInfo,
  UserInfo,
  GoogleInfo,
  UserLoggedIn,
} from "../assets/AppContext";
import { addProfile, getCommunities } from "../Services/ServerCommunication";

async function getAllCommunities() {
  let communities = await getCommunities();
  return communities.filter((community) => community.private == 0);
}

export const CreateUserScreen = () => {
  //STATE

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const [adress, setAdress] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [dataBaseCommunities, setDataBaseCommunities] = React.useState([]);
  const [firstName, setFirstName] = React.useState(
    googleInfo?.given_name ?? ""
  );
  const [lastName, setLastName] = React.useState(googleInfo?.family_name ?? "");

  //CONTEXT
  const { googleInfo, setGoogleInfo } = React.useContext(GoogleInfo);
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const { userLoggedIn, setLoggedIn } = React.useContext(UserLoggedIn);
  const { profileImagePath, setProfileImagePath } =
    React.useContext(ProfileImagePath);
  const { showCommunityIds, setShowCommunityIds } =
    React.useContext(ShowCommunityIds);
  const { myCommunitysInfo, setMyCommunitysInfo } =
    React.useContext(MyCommunitysInfo);

  React.useEffect(() => {
    const getComm = async () => {
      setDataBaseCommunities(await getAllCommunities());
    };
    getComm();
  }, []);

  async function createProfile() {
    setMyCommunitysInfo(
      multiSelectedIndex.map((item) => dataBaseCommunities[item.row])
    );
    let communityIDs = multiSelectedIndex.map(
      (item) => dataBaseCommunities[item.row].id
    );

    let accountData = {
      firstname: firstName,
      lastname: lastName,
      number: phoneNumber,
      email: googleInfo?.email ?? null,
      location: "",
      imgurl: "", //TODO fixa bucket-bild
      rating: 0, //TODO : Start rating?
      adress: adress,
      raters: 0,
      given: 0,
      taken: 0,
    };
    let updatedProfile = await addProfile(accountData, communityIDs);
    setUserInfo(updatedProfile);
    setShowCommunityIds(communityIDs);
    setLoggedIn(true);
  }

  const theme = useTheme();

  const groupDisplayValues = multiSelectedIndex.map((index) => {
    var community = dataBaseCommunities[index.row];
    return community.name;
  });
  const AddIcon = () => (
    <Icon style={styles.lockStyle} fill="#8F9BB3" name="plus-circle-outline" />
  );
  const StarIcon = (url) => (
    <>
      <Image
        style={tw`rounded-full`}
        source={{
          uri: url,
          height: 40,
          width: 40,
        }}
      />
    </>
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
          value={groupDisplayValues.join(", ")}
          multiSelect={true}
          label="Välj grannskap"
          placeholder="Välj grannskap"
          selectedIndex={multiSelectedIndex}
          onSelect={(index) => {
            setMultiSelectedIndex(index);
          }}
        >
          {dataBaseCommunities.map((item) => {
            return (
              <SelectItem
                key="majklockan"
                accessoryLeft={StarIcon(item.imgurl)}
                title={item.name}
              />
            );
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
          onPress={() => createProfile()}
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
