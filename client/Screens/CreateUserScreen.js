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
} from "@ui-kitten/components";
import tw from "twrnc";
import ImagePickerComp from "../Components/ImagePickerComponent";
import {
  ShowCommunityIds,
  MyCommunitysInfo,
  UserInfo,
  GoogleInfo,
  UserLoggedIn,
} from "../assets/AppContext";
import { defaultProfileImage } from "../assets/Images";
import {
  addProfile,
  editProfile,
  getCommunities,
  pushImagesToServer,
} from "../Services/ServerCommunication";

async function getAllCommunities() {
  let communities = await getCommunities();
  return communities.filter((community) => community.private == 0);
}

export const CreateUserScreen = () => {
  // CONTEXT
  const { googleInfo, setGoogleInfo } = React.useContext(GoogleInfo);
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const { userLoggedIn, setLoggedIn } = React.useContext(UserLoggedIn);
  const { showCommunityIds, setShowCommunityIds } =
    React.useContext(ShowCommunityIds);
  const { myCommunitysInfo, setMyCommunitysInfo } =
    React.useContext(MyCommunitysInfo);

  // STATE
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const [adress, setAdress] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [dataBaseCommunities, setDataBaseCommunities] = React.useState([]);
  const [firstName, setFirstName] = React.useState(
    googleInfo?.given_name ?? ""
  );
  const [lastName, setLastName] = React.useState(googleInfo?.family_name ?? "");
  const [ProfileImage, setProfileImage] = React.useState({
    uri: defaultProfileImage,
  });

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
      imgurl: "",
      rating: 0,
      adress: adress,
      raters: 0,
      given: 0,
      taken: 0,
    };
    let updatedProfile = await addProfile(accountData, communityIDs);
    let bucketImage = await pushImagesToServer(
      ProfileImage,
      "Profile",
      updatedProfile[0].id
    );
    let newProfile = updatedProfile;
    newProfile[0].imgurl = bucketImage;
    await editProfile(newProfile[0], newProfile[0].id);
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
        onBackdropPress={() => {
          setVisible(false);
        }}
      >
        <Card disabled={true}>
          <ImagePickerComp
            context="ItemImage"
            updateResult={(result) => {
              setProfileImage(result);
            }}
            hideTakePicture={() => {
              setVisible(false);
            }}
          />
        </Card>
      </Modal>
    );
  };

  const SelectCommunity = () => {
    return (
      <Layout style={{ height: 128, width: 350 }} level="1">
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
      <Layout style={styles.createUserContainer} level="1">
        <Image
          style={tw`rounded-full`}
          source={{ uri: ProfileImage.uri, height: 150, width: 150 }}
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
          style={[styles.input, { paddingTop: 20 }]}
          onChangeText={(nextValue) => setFirstName(nextValue)}
        />
        <Input
          label="Efternamn"
          value={lastName}
          style={styles.input}
          onChangeText={(nextValue) => setLastName(nextValue)}
        />
        <Input
          label="Telefonnummer"
          value={phoneNumber}
          style={styles.input}
          onChangeText={(nextValue) => setPhoneNumber(nextValue)}
        />
        <Input
          label="Adress"
          value={adress}
          style={styles.input}
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
                ? theme["color-primary-300"]
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
    paddingLeft: 7,
    paddingRight: 7,
  },
  createUserContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15,
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
